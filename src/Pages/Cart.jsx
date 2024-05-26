import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, emptyCart, incrementQuantity, removeCartItem } from '../Redux/cartSlice'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const ourCart = useSelector(state=>state.cartReducer)
  const [cartTotal,setCartTotal] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate

  useEffect(()=>{
    if (ourCart?.length>0){
    setCartTotal (ourCart?.map(item=>item.totalPrice).reduce((t1,t2)=>t1+t2))   
    }else{    
    setCartTotal(0)
    }
    },[ourCart])
  
  const handleDecrement = (product)=>{
    if(product.quantity>1){
      dispatch(decrementQuantity(product.id))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }
  const checkout = ()=>{
    dispatch(emptyCart())
    alert("order placed successfully.Thank you for purchasing with us...")
    navigate('/')
  }

  return (
    <>
      <Header/>
      <div style={{marginTop:'150px'}} className='container'>

       { 
       ourCart?.length>0 ?
       <div className='cart'>
        <h1>Cart Summary</h1>
        <div className='row mt-4'>
          <div className='col-lg-8'>
            <table className="table shadow">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
               { 
               ourCart?.map((product,index)=>(
                <tr key={product?.id}>
                <td>{index+1}</td>
                <td>{product?.title.slice(0,20)}...</td>
                <td><img width={'50px'} height={'50px'} src={product?.thumbnail} alt="Image" /></td>
                <td>
                  <div className="d-flex">
                    <button onClick={()=>handleDecrement(product)} className="btn fw-bolder">-</button>
                    <input value={product?.quantity} style={{width:'50px'}} type="text" className="fw-bolder me-1 ms-1"  readOnly />
                    <button onClick={()=>dispatch(incrementQuantity(product?.id))} className="btn fw-bolder">+</button>
                  </div>
                </td>
                <td>$ {product?.totalPrice}</td>
                <td> 
                  <button onClick={()=>dispatch(removeCartItem(product?.id))} className='btn'> <i className="fa-solid fa-trash text-danger"></i></button>
                  </td>
              </tr>
               ))
              
                }
              </tbody>
            </table>
            <div className="float-end">
              <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger'>EMPTY CART</button>
              <Link to={'/'} className='btn btn-primary'>SHOP MORE</Link>
              </div>
          </div>
          <div className='col-lg-4'>
            <div className="border rounded shadow p-3">
              <h4>Total Amount : <span className='text-danger'>${cartTotal}</span></h4>
              <hr />
<div className="d-grid">
  <button onClick={checkout} className="btn btn-success">CHECKOUT</button>
</div>
            </div>
          </div>
          </div>
        </div>
        :
        <div style={{height:'60vh'}} className='d-flex justify-content-center align-items-center flex-column'>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3613108-3020773.png" alt="" />
          <h3 className='text-danger'>Your Cart is empty!!!</h3>
        </div>
        }
        
      </div>
      
    </>
  )
}

export default Cart
