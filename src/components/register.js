import React,{useState} from "react"
import "./register.css"
import { useHistory } from "react-router-dom"

const Register =({registerUser})=>{

    const history = useHistory()
    
    const [_name, setName] = useState('');
    const [_email, setEmail] = useState('');
    const [_password,   setPassword] = useState('');
    const [_rePassowrd,   setRePassword] = useState('');

    const handleNameChange = event => {
        setName(event.target.value)
    };
    const handleEmailChange = event => {
        setEmail(event.target.value)
    };
    const handlePassChange = event => {
        setPassword(event.target.value)
    };
    const handlePass1Change = event => {
        setRePassword(event.target.value)
    };
    const register = () => {
        console.log("Name : ",_name);
        if(_name && _email && _password && (_password === _rePassowrd))
        {
            registerUser(_name,_email,_password,_rePassowrd)    
        } else{
            alert("invalid input");
        }
        
    }
    return (
        <div className="register">
            
            <h1>Register</h1>
            
            <input type="text" name="name"  placeholder="Your Name" onChange={handleNameChange}></input>
            <input type="email" name="email"  placeholder="Your Email" onChange={handleEmailChange}></input>
            <input type="password" name="password" placeholder="Your Password" onChange={handlePassChange}></input>
            <input type="password" name="reEnterPassword"  placeholder="Re-enter Password" onChange={handlePass1Change}></input>
            <div className="button" onClick = {register}>Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}
export default Register