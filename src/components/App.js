import React from 'react';
import UserContract from '../abis/UserContract.json';
import MarketPlace from '../abis/Marketplace.json';
import Web3 from 'web3';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState ,useEffect} from "react";
import Register from "./register";
import Login from "./login";
import Home from "./Home"
import './App.css';

function App() {
  const [account,setAccount] = useState("");
  const [ user, setLoginUser] = useState({});
  const [usercontract,setUserContract] = useState();
  const [marketcontract,setMarketContract] = useState();
  const [productCount,setPropertyCount] = useState("");
  const [products,setProduct] = useState([]);
  const [loading,setLoading] = useState(false);
  const [mounted, setMounted] = useState(false)

  const loadWeb3 = async() =>{

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

  }

  const loadBlockchainData= async() => {
    
    const web3 = window.web3

    //load account
    const accounts = await web3.eth.getAccounts()    
    setAccount(accounts[0])

    const networkID = await web3.eth.net.getId()

    //For User Contract
    const networkData = UserContract.networks[networkID]

    if(networkData){
      const userContract = web3.eth.Contract(UserContract.abi,networkData.address)
      setUserContract(userContract)
    } else{
      window.alert('User contract not deployed to detected network')
    }

    //For PropertyPlace Contract
    const networkData1 = MarketPlace.networks[networkID]

    if(networkData1){
      const marketplace = web3.eth.Contract(MarketPlace.abi,networkData1.address)
      setMarketContract(marketplace)
      
      const productCount = await marketplace.methods.productCount().call()
      
      setPropertyCount(productCount)
      

      for(var i = 1;i<=productCount; i++){
        const prod = await marketplace.methods.products(i).call()
        setProduct(products => [...products, prod]);
      }
    } else{
      window.alert('Property contract not deployed to detected network')
    }
    
  }
  
  if(!mounted){
    loadWeb3()
    loadBlockchainData()
  }

  useEffect(() =>{
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
    setMounted(true)
  },[])


  const registerUser = (_name,_email,_password)=>{
    console.log("yes");
    usercontract.methods.registerUser(_name,_email,_password).send({from: account})

  }

  const updateUser = (user) =>{
    console.log("Updated User value from login",user)
    localStorage.setItem("MyUser",JSON.stringify(user))
    setLoginUser(user)
  }


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user.AccountNo ?              
              <Home 
              user={user}
              marketcontract={marketcontract}
              updateUser={updateUser}
              products={products}
              />              
              :
              <Login
                usercontract= {usercontract} 
                updateUser={updateUser}
                account={account}/>
            }    
          </Route>
          <Route exact path="/register">
            <Register
              registerUser = {registerUser}
            />    
          </Route>
          <Route exact path="/login">
            <Login
              usercontract= {usercontract}
              updateUser = {updateUser}
              account={account}
              
            />    
          </Route>
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
