import React, { Component } from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'
export class AppDownload extends Component {
  render() {
    return (
      <div className='app-download' id='app-download'>
        <p>Pour une meilleure expérience téléchargez <br/>l'application GroupeEtoileFromation</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store} alt="play_store" />
            <img src={assets.app_store} alt="app_store" /> 
           
        </div>
        <a href="#navbar">
    <div className='up_icon'>
        <img src={assets.up_icon} alt="up_icon" /> 
    </div>
</a>
      </div>
    )
  }
}

export default AppDownload
