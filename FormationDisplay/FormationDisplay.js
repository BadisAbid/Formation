import React, { useContext } from 'react'
import './FormationDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FormationItem from '../FormationItem/FormationItem'


const FormationDisplay = ({category}) => {
    const {formation_list}=useContext(StoreContext)
  return (
    <div className='formation-display' id='formation-display'>
        <h2>Top formation près de chez vous !</h2>
        <div className="formation-display-list">
            {formation_list.map((item,index)=>{
              // {console.log(category,item.category);}
              if(category==="All" || category===item.category){
      return <FormationItem key= {index} id={item._id} name={item.name} description={item.description} duree={item.duree} price={item.price} image={item.image}  />
              }
               
            })}

        </div>
      
    </div>
  )
}

export default FormationDisplay
