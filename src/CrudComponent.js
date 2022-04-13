import React, { useState } from 'react';
import axios from 'axios';

function CrudComponent(){
    const [state,setState]=React.useState({
        id: '',
        name: '',
        price: '',
        manufacturer: ''
    });
    const [product,setProduct] = React.useState([])
    const [load,setLoad] = React.useState(false);
    
    React.useEffect(()=>{
        if(!load){
          axios.get('https://62567c3652d8738c692f7888.mockapi.io/products').then(res => setProduct(res.data));
        }
        setLoad(true);
    })

    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(state.id!=undefined && state.id!=''){
            var respone = axios.put(`https://62567c3652d8738c692f7888.mockapi.io/products/${state.id}`,
            {
                name: state.name,
                price: state.price,
                manufacturer: state.manufacturer,
            }
            ).then(res => {
              var index = product.findIndex((row)=>row.id===res.data.id);
              var products = product;
              products[index] = res.data;
              setState({
                id: '',
                name: '',
                price: '',
                manufacturer: ''});
            setProduct(products);
            });
        }
        else{
          console.log("post");
            axios.post(`https://62567c3652d8738c692f7888.mockapi.io/products`,
            {
                name: state.name,
                price: state.price,
                manufacturer: state.manufacturer,
            }
            ).then(res => {
              var products = product;
              products.push(res.data);
              setState({name:'',price:'',manufacturer:'',id:''});
              setProduct(products);
            });
        }
        
    }
    
    const reset = () => {
      setState({
        id: '',
        name: '',
        price: '',
        manufacturer: ''
      })
    }

    const handleDelete = (id) =>{
        axios.delete(`https://62567c3652d8738c692f7888.mockapi.io/products/${id}`);
        var products = product.filter((row) => row.id !==id);
        setProduct(products);
    }
    const onPopulateData = (id) => {
        const selectedData = product.filter((row) => row.id === id)[0];
        console.log(selectedData.id,selectedData.name);
        setState(selectedData);
        console.log(state);
    }

    return(
        <>
        <h3> Crud Application </h3>
        <h3> Product </h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label> Name </label>
            <input
              type="text"
              value={state.name}
              onChange={(e) => setState({ name: e.target.value, price: state.price, manufacturer:state.manufacturer, id:state.id })}
            />
          </div>
          <br />
          <div>
            <label> Price </label>
            <input
              type="text"
              value={state.price}
              onChange={(e) => setState({ name: state.name, price: e.target.value, manufacturer:state.manufacturer, id:state.id })}
            />
          </div>
          <br />
          <div>
            <label> Manufacturer </label>
            <input
              type="text"
              value={state.manufacturer}
              onChange={(e) => setState({ name: state.name, price: state.price, id:state.id, manufacturer: e.target.value })}
            />
          </div>
          <br />
          <div>
            <button type="submit"> Submit </button> &nbsp; &nbsp;
            <button type="button" onClick={() => reset()}> Reset </button> &nbsp; &nbsp;
          </div>
        </form>
        <br /> <br />
        <table border={1}>
          <thead>
            <tr>
              <td> Id </td>
              <td> Name </td>
              <td> Price </td>
              <td> Manufacturer </td>
              <td> Actions </td>
            </tr>
          </thead>
          <tbody>
            {product.map((row) => (
              <tr>
                <td> {row.id} </td>
                <td> {row.name} </td>
                <td> {row.price} </td>
                <td> {row.manufacturer} </td>
                <td>
                  <button onClick={() => onPopulateData(row.id)}>Edit</button>{' '}
                  &nbsp;
                  <button onClick={() => handleDelete(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
}

export default CrudComponent;