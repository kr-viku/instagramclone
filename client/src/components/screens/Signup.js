import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'

const Signup = () =>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image, setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = () =>{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "spycloud")
        fetch("https://api.cloudinary.com/v1_1/spycloud/image/upload", {
            method: "post",
            body:data
        })
        .then(res => res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const uploadFields = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email", classes:"#f44336 red"})
            return 
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})
            }
            else{
                M.toast({html: data.message, classes:"#4caf50 green"})
                history.push('/signin')
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    const PostData = () =>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
        
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <h6 className="grey-text text-darken-2">Sign up to see photos and videos from your friends</h6>
                <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-2">
                    <span>Profile Pic</span> 
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={()=>PostData()}>
                    SignUp
                </button>
                <p>
                    <Link to="/signin">Have an account?<span className="blue-text text-darken-2"> Log in</span></Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;