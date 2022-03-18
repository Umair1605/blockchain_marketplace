import React,{useState} from "react"
import "./login.css"
import { useHistory } from "react-router-dom"

const Login =(props)=>{
    const history = useHistory()
    const [_email, setEmail] = useState('');
    const [_password,   setPassword] = useState('');

    // const history = useHistory()

    // const [ user, setUser] = useState({
    //     email:"",
    //     password:""
    // })

    // const handleChange = e => {
    //     const { name, value } = e.target
    //     setUser({
    //         ...user,
    //         [name]: value
    //     })
    // }
    const handleEmailChange = event => {
        setEmail(event.target.value)
    };
    const handlePassChange = event => {
        setPassword(event.target.value)
    };

    const login = async() => {
        const check = await props.usercontract.methods.checkUser(_email,_password).call()
        
        if (check.toNumber() === 123){
            alert("Wrong");
        }
        else{
            const user = await props.usercontract.methods.users(check.toNumber()).call()
           
            if(user.AccountNo === props.account)
            {
                alert("Login successfull");
                props.updateUser(user)
                history.push("/")
            }
            
        }

        // if(check === true)
        // {
        //     alert("Login successfull");
        //     props.updateUser(check)
        //     history.push("/")
        // } else {
        //     alert("User Not correct");
        // }
    }

    return (
        <div className="login">

            <h1>Login</h1>
            <input type="text" name="email"   placeholder="Enter your Email" onChange={handleEmailChange}></input>
            <input type="password" name="password"   placeholder="Enter your Password" onChange={handlePassChange}></input>
            <div className="button" onClick={login}  >Login</div>
            <div>or</div>
            <div className="button"  onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}
export default Login