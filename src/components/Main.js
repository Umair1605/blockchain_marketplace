import React from 'react';
import { useState } from 'react';


const Main = (props) => {

    const [_name, setName] = useState('');
    const [_price,   setPrice] = useState(0);

    const handlePriceChange = event => {
        setPrice(event.target.value)
    };
    
    const handleNameChange = event => {
        setName(event.target.value)
    };
 
    return (
        <div id="content">       
            <h1>Add Product</h1>
            <form onSubmit={async (event) => {
                event.preventDefault()
                const _price1 = window.web3.utils.toWei(_price.toString(), 'Ether')

                props.createProduct(_name,_price1)
            }}>
            
            <div className="form-group mr-sm-2">
                <input
                id="productName"
                type="text"
                className="form-control"
                placeholder="Product Name"
                onChange={handleNameChange}
                required />
            </div>
            <div className="form-group mr-sm-2">
                <input
                id="productPrice"
                type="text"
                className="form-control"
                placeholder="Product Price "
                onChange={handlePriceChange}
                required />
            </div>
            
        
            <button type="submit" className="btn btn-primary">Add Product</button>
            </form>

            <p>&nbsp;</p>

            <h2>List Property</h2>

            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Owner</th>
                    </tr>
                </thead>
                <tbody id="propertyList">
                    
                    {props.products.map((product,key) => {
            
                        return(
                        <tr >
                            <th scope="row">{product.id.toString()}</th>
                            <td>{product.name}</td>
                            <td>{window.web3.utils.fromWei(product.price.toString(),'Ether')}</td>
                            <td>{product.owner}</td>
                            <td><button 
                                    name={product.id}
                                    value={product.price}
                                    onClick={(event)=>{
                                        props.purchaseProduct(event.target.name,event.target.value)
                                    }}
                                    >
                                        Buy
                                    </button>
                                </td>                         
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
  
}

export default Main;
