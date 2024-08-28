// import React, { useContext } from 'react';
// import './Cart.css';
// import { StoreContext } from '../../context/StoreContext';

// const Cart = () => {
//     const { cartItems, removeFromCart } = useContext(StoreContext);

//     const handleRemove = (item) => {
//         removeFromCart(item);
//     };

//     return (
//         <div className='cart'>
//             <div className='cart-items'>
//                 <div className='cart-items-title'>
//                     <p>Articles</p> 
//                     <p>Title</p>
//                     <p>Prix</p>
//                     <p>Total</p>
//                     <p>Supprimer</p>
//                 </div> 
//                 <br/>
//                 <hr/>
//                 {cartItems.map((item, index) => (
//                     <div key={index}>
//                         <div className='cart-items-title cart-items-item'>
//                             <img src={item.image} alt="item" />
//                             <p>{item.name}</p>
//                             <p>{item.price} DT</p>
//                             <p></p>
//                             <p className='delete' onClick={() => handleRemove(item)}>X</p>
//                         </div>
//                         <hr/>
//                     </div>
//                 ))}
//                 </div> 

//             <div className='cart-bottom'>
//               <div className='cart-total'>
//                 <h2>Totaux du panier</h2>
//                 <div>
//                   <div className='cart-total-details'>
//                     <p>Total</p> 
//                     <p>{0}</p>
//                   </div>
//                   <hr/>
//                   <div className='cart-total-details'>
//                     <p>Delivery Fee</p>
//                     <p>{2} </p>
//                   </div>
//                   <hr/>
//                   <div className='cart-total-details'>
//                    <b>Total</b>
//                    <b>{0} </b>
//                   </div>  
//                 </div>
//                   <button>Passer à la caisse</button>
//               </div>
//               <div className='cart-promocode'>
//                 <div>
//                   <p> Si vous avez un code promo, saisissez-le ici </p>
//                   <div className='cart-promocode-input'>
//                     <input type='text' placeholder='code promo' />
//                     <button>Appliquer</button>
                    
//                   </div>
//                 </div>
//               </div>
//             </div>
//       </div>
//     );
// }

// export default Cart;



import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart , calculateTotalPrice} = useContext(StoreContext);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleRemove = () => {
        if (itemToDelete) {
            removeFromCart(itemToDelete);
            setItemToDelete(null); // Close the popup after deletion
        }
    };

    const confirmDelete = (item) => {
        setItemToDelete(item); // Open the popup with the selected item
    };

    const cancelDelete = () => {
        setItemToDelete(null); // Close the popup without deleting
    };

    const navigate = useNavigate();

    // Function to calculate total price of items in the cart
  

    return (
        <div className='cart'>
            <div className='cart-items'>
                <div className='cart-items-title'>
                    <p>Articles</p> 
                    <p>Title</p>
                    <p>Prix</p>
                    <p>Supprimer</p>
                </div> 
                <br/>
                <hr/>
                {cartItems.map((item, index) => (
                    <div key={index}>
                        <div className='cart-items-title cart-items-item'>
                            <img src={item.image} alt="item" />
                            <p>{item.name}</p>
                            <p>{item.price} DT</p>
                            <p className='delete' onClick={() => confirmDelete(item)}>X</p>
                        </div>
                        <hr/>
                    </div>
                ))}
            </div>

            {itemToDelete && (
              <div className='popup-overlay'>
                <div className='confirmation-popup'>
                    <p>Are you sure that you want to delete this formation from your cart?</p>
                    <button className='yes-btn' onClick={handleRemove}>Yes</button>
                    <button className='no-btn' onClick={cancelDelete}>No</button>
                </div>
              </div>
            )}

            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Totaux du panier</h2>
                    <div>
                      <hr/>
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>{calculateTotalPrice()} DT</b>
                        </div>  
                    </div>
                    
                    <button onClick={()=>navigate('/order')}>Passer à la caisse</button>
                </div>
                <div className='cart-promocode'>
                    <div>
                        <p>If you have a promo code, enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type='text' placeholder='promo code' />
                            <button>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
