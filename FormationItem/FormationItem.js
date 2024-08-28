// import React from 'react'
// import './FormationItem.css'
// import { assets } from '../../assets/frontend_assets/assets'

// const FormationItem = ({id, name , price ,description, image}) => {
//   return (
//     <div className='formation-item'>
//         <div className="formation-item-img-container">
//             <img className='formation-item-image' src={image} alt="item" />
//         </div>
      
//         <div className='formation-item-info'>
//             <div className='formation-item-name-rating'>
//                 <p>{name} </p>
//                 <img src={assets.rating_starts}  alt="rating" />
//             </div>
//         <p className='foramation-item-description'> {description} </p>
//         <p className= "formation-item-price"> {price}DT </p>
//         <div className='formation-item-bag-view'>

                  
//                   <img className='formation-item-bag' src={assets.bag_icon}  alt="bag_icon" />
//                   <img  src={assets.view_icon}  alt="view_icon" />
//             </div>
      
//         </div>


//     </div>
//   )
// }

// export default FormationItem









// import React, { useContext, useState } from 'react';
// import './FormationItem.css';
// import { assets } from '../../assets/frontend_assets/assets';
// import { StoreContext } from '../../context/StoreContext';

// const FormationItem = ({ id, name, price, description, image }) => {
//   // isPopupVisible w isVisible houma les variables bech yajouti popup lel item initiallemnt false 5ater mil loul matothorech
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   //addToCart houwa fonction bech yajouti item lel cartItems
//   const { addToCart } = useContext(StoreContext);

//   //handleViewClick houwa fonction bech yrod el popup tetra
//   const handleViewClick = () => {
//     setIsPopupVisible(true);
//   };
// //closePopup houwa fonction bech y5abi el popup
//   const closePopup = () => {
//     setIsPopupVisible(false);
//   };

//   //handleAddToCart houwa fonction bech yajouti item lel cartItems
//   const handleAddToCart = () => {
//     addToCart({ name, price, image });
//   };

//   return (
//     <div className='formation-item'>
//       <div className="formation-item-img-container">
//         <img className='formation-item-image' src={image} alt="item" />
//       </div>

//       <div className='formation-item-info'>
//         <div className='formation-item-name-rating'>
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="rating" />
//         </div>
//         <p className='formation-item-description'>{description}</p>
//         <p className="formation-item-price">{price}DT</p>
//         <div className='formation-item-bag-view'>
//           <img className='formation-item-bag' src={assets.bag_icon} alt="bag_icon" onClick={handleAddToCart} />
//           <img className='formation-item-view' src={assets.view_icon} alt="view_icon" onClick={handleViewClick} />
//         </div>
//       </div>
     
//  {/* isPopupVisible w isVisible houma les variables bech yajouti popup lel item initiallemnt false 5ater mil loul matothorech  */}
//  {/* ({isPopupVisible && ...}) ma3neha itha kén isPopupVisible true */}
//       {isPopupVisible && (
//         <div className="popup-overlay" onClick={closePopup}>
//           <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//           <img className='close-popup ' onClick={closePopup} src={assets.close_icon} alt="close_icon" />
//             <img className='popup-image' src={image} alt="item" />
//             <h3>{name}</h3>
//             <p className='popup-description'>{description}</p>
//             <p className='popup-price'>Price: {price}DT</p>
//             <img className='popup-bag' src={assets.bag_icon} alt="item" onClick={handleAddToCart} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
  
// export default FormationItem;

import React, { useContext, useState } from 'react';
import './FormationItem.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FormationItem = ({ id, name, price, description, duree, image }) => {
  const [isViewPopupVisible, setIsViewPopupVisible] = useState(false); // State for view icon popup
  const [isBagPopupVisible, setIsBagPopupVisible] = useState(false); // State for bag icon popup
  const [bagPopupMessage, setBagPopupMessage] = useState('');
  const { addToCart, cartItems } = useContext(StoreContext);

  const handleAddToCart = () => {
    const isAlreadyInCart = cartItems.some(item => item.name === name);

    if (isAlreadyInCart) {
      setBagPopupMessage("You already added this formation to your cart.");
    } else {
      addToCart({ name, price, image });
      setBagPopupMessage("Formation added to cart successfully.");
    }
    setIsBagPopupVisible(true);
  };

  const closeBagPopup = () => {
    setIsBagPopupVisible(false);
  };

  const closeViewPopup = () => {
    setIsViewPopupVisible(false);
  };

  return (
    <div className='formation-item'>
      <div className="formation-item-img-container">
        <img className='formation-item-image' src={image} alt="item" />
      </div>

      <div className='formation-item-info'>
        <div className='formation-item-name-rating'>
          <p>{name}</p>
          
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className='formation-item-description'>{description}</p>
        <p className="formation-item-duree">{duree}</p>
        <p className="formation-item-price">{price}DT</p>
        <div className='formation-item-bag-view'>
          <img className='formation-item-bag' src={assets.inscription_icon} alt="inscription_icon" onClick={handleAddToCart} />
          <img className='formation-item-view' src={assets.view_icon} alt="view_icon" onClick={() => setIsViewPopupVisible(true)} />
        </div>
      </div>
     
      {isViewPopupVisible && (
      
        <div className="popup-overlay" onClick={closeViewPopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img className='close-popup' onClick={closeViewPopup} src={assets.close_icon} alt="close_icon" />
            <img className='popup-image' src={image} alt="item" />
            <h3>{name}</h3>
            <p className='popup-description'>{description}</p>
            <p className='popup-duree'>{duree}</p>
            <p className='popup-price'>Price: {price}DT</p>
            <div className='popup-inscription_icon'>
            <img  src={assets.inscription_icon} alt="item" onClick={handleAddToCart} />
            </div>
          </div>
        </div>
      )}

      {isBagPopupVisible && (
        <div className="popup-overlay" onClick={closeBagPopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <p>{bagPopupMessage}</p>
            <button onClick={closeBagPopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormationItem;




