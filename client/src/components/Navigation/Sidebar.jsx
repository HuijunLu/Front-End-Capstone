import React, { useState, useEffect } from 'react';
import { RiDeleteBinLine} from "react-icons/ri";
import {AiOutlineMinusSquare, AiOutlinePlusSquare } from  "react-icons/ai";
import './Sidebar.css';


const Sidebar = (props) => {

  const [sortedCartData, setSortedCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const cartitemphotoClickHandler = (e) => {
    e.preventDefault();
    props.setProduct_id(e.target.id);
  }

  const deleteBinClick = async (e) => {
    if (e.target.id !== undefined) {
      var newCartData = await props.cartData.filter((cart)=>{
        return Number(cart.style_id) !== Number(e.target.id)
      })
      await props.setCartData(newCartData);
    }
  };

  const minusOneClick = (e) => {
    var newCartData = props.cartData.slice();
    if (e.target.id !== undefined) {
      var firstelementtobedeleted = props.cartData.find(element => Number(element.style_id) === Number(e.target.id))
      var deleteindex = props.cartData.indexOf(firstelementtobedeleted);
      if (Number(firstelementtobedeleted.quantity) === 1) {
        newCartData.splice(deleteindex, 1);
      } else if (Number(firstelementtobedeleted.quantity) > 1) {
        firstelementtobedeleted.quantity = Number(firstelementtobedeleted.quantity) - 1
        var tobeinserted = firstelementtobedeleted;
        newCartData.splice(deleteindex, 1, tobeinserted);
      }
      props.setCartData(newCartData);
    }

  };

  const plusOneClick = (e) => {
    console.log(e.target.id);
    var newCartData = props.cartData.slice();
    if (e.target.id !== undefined) {
      var firstElement = props.cartData.find(element => Number(element.style_id) === Number(e.target.id))
      var elementIndex = props.cartData.indexOf(firstElement);
      firstElement.quantity = Number(firstElement.quantity) + 1
      var tobeinserted = firstElement;
      newCartData.splice(elementIndex, 1, tobeinserted);
      props.setCartData(newCartData);
    }

  };

  useEffect(()=>{
    var styleidBasedData = {};
    var totalprice = 0;
    props.cartData.forEach((item)=>{
      let {style_id, product_id, photo_url} = item;
      let quantity = Number(item.quantity);
      let price = Number(item.price);
      let sale_price = Number(item.sale_price)

      if (styleidBasedData[style_id] === undefined) {
       styleidBasedData[style_id] = {product_id: product_id, style_id: style_id, photo_url: photo_url, quantity: quantity, price: price, sale_price: sale_price};
       if (item.sale_price === null) {
         totalprice += price * quantity;
       } else {
         totalprice += sale_price * quantity;
       }
      } else {
        styleidBasedData[style_id].quantity += quantity;
        if (item.sale_price === null) {
          totalprice += price * quantity;
        } else {
          totalprice += sale_price * quantity;
        }
      }
    });
    setSortedCartData(Object.values(styleidBasedData));
    setTotalPrice(totalprice);
  }, [props.cartData]);


  return (
  <div id="Sidebar">
    <div className="subtotalbox">
      <p>Subtotal</p>
      <p id="carttotalprice">${totalPrice}.00</p>
      {totalPrice === 0 ?
      <p>Add some items to the shopping cart.</p>
      :
      <p>Your order qualifies for FREE Shipping.</p>
      }
    </div>

    <div>
      {sortedCartData.map((item, index)=>
        <div className="cartitem" key={index}>
          <img className="cartitemphoto" id={item.product_id} src={item.photo_url} onClick={cartitemphotoClickHandler}>
          </img>
          {item.sale_price === 0 ?
            <p>${item.price}.00</p>
            :
            <span>
              <p id="onsale">${item.sale_price}.00  </p>
              <p id="linethrough">${item.price}.00</p>
            </span>


          }
          <span className = 'minusPlusQuantity'>
            <AiOutlineMinusSquare className='minusPlus'  id={item.style_id}  size="18px" onClick={minusOneClick}/>
            <p>QTY: {item.quantity}</p>
            <AiOutlinePlusSquare className='minusPlus' id={item.style_id} size="18px" onClick={plusOneClick}/>
          </span>
          <span className='bagDelete' value={item.style_id} id={item.style_id} onClick={deleteBinClick} >
            <RiDeleteBinLine  value={item.style_id} id={item.style_id} size="20px" />
          </span>
        </div>
      )}
    </div>
  </div>
  )
  }

export default Sidebar;

