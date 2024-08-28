// import React, { useState } from 'react'
// import './List.css'
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useEffect } from 'react';




// const List = () => {
//   const url ="http://localhost:4000"; // bech n3ayetou el api call
// //lazemna n7otto all the data from the database fi variable state
// const [list,setList] = useState([]);
// const fetchList = async()=>{
//   //api call
//   const response = await axios.get(`${url}/api/formation/list`);
 
//   if(response.data.success){
//     setList(response.data.data)
//   }
//   else{
//    toast.error(response.data.message) //  el message 3amlo fil backend
//   }
// }  

// const removeFormation = async(formationId)=>{
//  //api call 
//   const response = await axios.post(`${url}/api/formation/remove`,{id:formationId}); // to remove from database
//   // tawa ba3ed mayetfasse5 lazem na3mlou refréch lel page mta3na 
//   await fetchList();
//   if(response.data.success){
//     toast.success(response.data.message)
//   }
//   else{
//     // toast.error(response.data.message)
//     toast.error("Erreur, formation non supprimée");
//   }
// }






// //lezemna na3mlou run lil fonctuion héthi whenever the page trefréchi
// useEffect(()=>{
//   fetchList();//néda lil fonction
// },[])


//   return (
//     <div className='list add flex-col'>
//       <h2>Liste de toutes les formations</h2><br/>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Nom</b>
//           <b>Catégorie</b>
//           <b>Description</b>
//           <b>Prix</b>
//           <b>Action</b>
//         </div>
//           {list.map((item,index)=>{
//               return(
//                 <div key={index} className="list-table-format">
//                   <img src={ `${url}/images/`+item.image } alt="formation-image" />
//                   <p>{item.name}</p>
//                   <p>{item.category}</p>
//                   <p>{item.description}</p>
//                   <p>{item.price} DT</p>
//                   <p onClick={()=> removeFormation(item._id)} className='delete'>X</p>
                  

//                 </div>
//               )
//           })}
//       </div>
//     </div>
//   )
// }

// export default List


import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';


const List = ({url}) => {
  // const url = "http://localhost:4000"; 
  const [list, setList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formationToDelete, setFormationToDelete] = useState(null);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/formation/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const confirmDelete = (formationId) => {
    setFormationToDelete(formationId);
    setShowPopup(true);
  };

  const removeFormation = async () => {
    if (!formationToDelete) return;
    const response = await axios.post(`${url}/api/formation/remove`, { id: formationToDelete });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Erreur, formation non supprimée");
    }
    setShowPopup(false);
    setFormationToDelete(null);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setFormationToDelete(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <h2>Liste de toutes les formations</h2><br />
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Nom</b>
          <b>Catégorie</b>
          <b>Description</b>
          <b>Durée</b>
          <b>Prix</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt="formation-image" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.description}</p>
            <p>{item.duree}</p>
            <p>{item.price} DT</p>
            <p onClick={() => confirmDelete(item._id)} className='delete'>X</p>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Etes-vous sûr de vouloir supprimer cette formation ?</p>
            <button className='yes-btn' onClick={removeFormation}>Oui</button>
            <button className='no-btn' onClick={cancelDelete}>Non</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
