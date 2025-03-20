import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)

    const [currentState, setCurrentState] = useState('Login')
    const [data, SetData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name
        const value = event.target.value
        SetData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url
        if(currentState === 'Login'){
            newUrl += '/api/user/login'
        }else{
            newUrl += '/api/user/register'
        }
        
        const res = await axios.post(newUrl, data);
        
        if(res.data.success){
            setToken(res.data.token)
            localStorage.setItem('token', res.data.token)
            setShowLogin(false)
        }else{
            alert(res.data.message)
        }
    }

  return (
    <div className='login-popup'>
        <form action="" onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/> }
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currentState==="Sign Up" ? "Create account" : "Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By countinuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currentState ==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")} >Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrentState("Login")} >Login here</span></p>
            }   
        </form>
    </div>
  )
}

export default LoginPopup
