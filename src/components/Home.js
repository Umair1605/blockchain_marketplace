import { useEffect,useState } from 'react';
import Web3 from 'web3'
import React from 'react';
import Navbar from './Navbar'
import Main from './Main'


const Home = ({user,updateUser,marketcontract,products}) =>{

  const [propertyAccount,setAccount] = useState("");
  const [loading,setLoading] = useState(false);
  const [mounted, setMounted] = useState(false)
  
  const loadBlockchainData = async() => {
    
    const web3 = window.web3
    
    //load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
  }

  if(!mounted){
    loadBlockchainData()
  }

  useEffect(() =>{
    setMounted(true)
  },[])
  

  const createProduct = (_name, _price)=>{
    marketcontract.methods.createProduct(_name, _price).send({from: propertyAccount})
  }

  const purchaseProduct = (id, price) =>{
    console.log("Check");
    marketcontract.methods.purchaseProduct(id).send({from: propertyAccount, value: price})
    
    
    
  }
  return (
        <div>
            <Navbar user={user} updateUser={updateUser}/>
            <div className="container-fluid mt-5">
                <div className="row">
                <main role="main" className="col-lg-12 d-flex text-center">
                    
                { loading
                    ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                    : <Main 
                    createProduct={createProduct} 
                    marketcontract={marketcontract}
                    products={products}
                    purchaseProduct={purchaseProduct}
                    
                    />
                }
                        
                </main>
                </div>
            </div> 
        </div>
    
    
  );
} 


export default Home;
