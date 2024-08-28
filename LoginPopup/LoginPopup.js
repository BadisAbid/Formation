







// yemchi w ytalla3 error ama el si'ncrire myhaezzech lel se connecter 


import { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  // To toggle between login and registration
  const [currState, setCurrState] = useState("S'inscrire");

  // To store form data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    newUrl += currState === "Se connecter" ? "/api/user/login" : "/api/user/register";
    
    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false); // Close the popup
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const toggleForm = () => {
    setCurrState(prevState => prevState === "S'inscrire" ? "Se connecter" : "S'inscrire");
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.close_icon} alt="close_icon" />
        </div>

        <div className='login-popup-inputs'>
          {currState === "Se connecter" ? null : (
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />
          )}
          <br />
          <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder="Your email" required />
          <br />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>

        <button type='submit' className='login-popup-btn'>
          {currState === "S'inscrire" ? "S'inscrire" : "Se connecter"}
        </button>

        {currState === "S'inscrire" && (
          <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p>
              En continuant, j'accepte les conditions d'utilisation et la politique de confidentialité.
            </p>
          </div>
        )}

        <div className='login-pagraph'>
          {currState === "Se connecter" ? (
            <p>Créer un compte ?<span onClick={toggleForm}> Cliquez ici </span></p>
          ) : (
            <p>Vous avez déjà un compte ?<span onClick={toggleForm}> Connectez-vous ici </span></p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;













