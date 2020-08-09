import React, {useState, useContext, } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../../App'
import M from 'materialize-css'

const SignIn = () =>{
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email", classes:"#f44336 red"})
            return 
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({ type:"USER", payload: data.user})
                M.toast({html: "signed in Successfully", classes:"#4caf50 green"})
                history.push('/')
            }
        }).catch(err =>{
            console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" onClick={()=>PostData()}>
                    Login
                </button>
                <p>
                    <Link to="/signup">Don't have an account?<span className="blue-text text-darken-2"> Sign up</span></Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn;