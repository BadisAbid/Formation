import React from 'react'
import './PlaceOrder.css'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const {calculateTotalPrice} = useContext(StoreContext);
  return (

    <form className='place-order'>
       <div className='place-order-left'>
      <p className='title'>Delivery Information </p>
      <div className='multi-fields'>
        <input placeholder='Prénom'></input>
        <input placeholder='Nom'></input>
      </div>
      <input placeholder='Adresse email'></input>
      <input placeholder='Rue'></input>
      <div className='multi-fields'>
        <input placeholder='Ville'></input>
        <input placeholder='État'></input>
      </div>
      <div className='multi-fields'>
        <input placeholder='Zip code'></input>
        <input placeholder='Pays'></input>
      </div>
      <input placeholder='Téléphone'></input>
       </div>

       <div className='place-order-right'>
       <div className='cart-total'>
                    <h2>Totaux du panier</h2>
                    <div>
                      <hr/>
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>{calculateTotalPrice()} DT</b>
                        </div>  
                    </div>
                    <button>procéder au paiement</button>
                </div>
        </div>
    </form>
  )
}

export default PlaceOrder
