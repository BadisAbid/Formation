import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';




const Add = ({url})=> {

    // const url ="http://localhost:4000"; // bech n3ayetou el api call
    //héthi 5assa bil uploead image akil taswira eli bech y7otha el utilisateur fil formulaire
        const [image,setImage] = useState(false)
        // lenna bech na3mlou objet bech n7otto fih les données eli bech y7othom el utilisateur fil formulaire
        const[data,setData] = useState({
            name:'',
            description:'', 
            duree:'', 
            price:'', // lenna el price bech ykoun ké string 
            category:'Langages de programmation' // 5aterha par default select milloul ma7touta Langages de programmation
           

        })

        const onChangehandler = (event)=>{
                const name = event.target.name;
                const value = event.target.value;
                setData(data=>({...data,[name]:value}))
        }
            // api call 
        const onSubmitHandler = async (event)=>{
            event.preventDefault(); // bech ba3ed matenzel btn ajouter  el page mata3malech refrech
           
            const formData = new FormData(); 
            //tawa  insert akil name , description , price , category w taswira fi form wa7da
            // bech yet7attou fil database 
            formData.append('name',data.name);
            formData.append('description',data.description);
            formData.append('price',Number(data.price)); // 5ater 3malneh number fil backend donc lezem nroddoh number
            formData.append('category',data.category);
            formData.append('duree',data.duree); 
            // w lenna el image bech tetsajjel w tetzed fi upload file fil backend
            formData.append('image',image);
            // lehné bech n3ayetou el api call
            const response = await axios.post(`${url}/api/formation/add`,formData);// post 5ater el add 3malneha post
            if(response.data.success){
                // itha ken el add t3malet bil s7i7 bech ya3mel reset lel formulaire
                setData({
                    name:'',
                    description:'', 
                    duree:'',
                    price:'',
                    category:'Langages de programmation'
                })
                //bech el image tarja3 fer8a
                setImage(false)
                toast.success(response.data.message) // el message 3amlo fil backend
            }
            
            else{
                toast.error(response.data.message) //  el message 3amlo fil backend
            }
           

            }

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>télécharger image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="upload"/>    
                </label>

                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>

            </div>
            <div className="add-product-name flex-col"> 
                <p>Nom du formation</p>
                <input onChange={onChangehandler} value={data.name} type="text" name='name' placeholder="tapez ici" required/>
            </div>

            <div className="add-product-description flex-col">
                <p>Formation description</p>
                <textarea onChange={onChangehandler} value={data.description}  name="description"  rows ="6" placeholder="écrire contenu ici" required></textarea>
               

            </div>
            <div className='durée flex-col'>
                <p>Durée de formation</p>
            <input onChange={onChangehandler} value={data.duree} type="text" name='duree' placeholder="2 mois" required/>
            </div>

            
            <div className="add-category-price">

                <div className='add-category flex-col'>
                    <p>Catégorie de formation</p>
                    <select onChange={onChangehandler} name="category">
                        <option value="Langages de programmation">Langages de programmation</option>
                        <option value="Développement web">Développement web</option>
                        <option value="Base de données">Base de données</option>
                        <option value="Développement de jeux">Développement de jeux</option>
                        <option value="Développement mobile">Développement mobile</option>
                        <option value="Sécurité">Sécurité</option>
                        <option value="Adobe">Adobe</option>
                        <option value="Office">Office</option>
                    </select>

                </div>

                    <div className="add-price flex-col">
                        <p>Formation prix</p>
                        <input onChange={onChangehandler} value={data.price} type="number" name="price" placeholder="100 Dt" required/>

                    </div>


            </div>


            <button type='submit' className="add-btn">Ajouter</button>

        </form>
      
    </div>
  )
}

export default Add
