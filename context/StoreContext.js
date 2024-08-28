import { createContext, useEffect, useState } from "react";
import { formation_list } from '../assets/frontend_assets/assets';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    //cartItems houwa tableau initialement fere8 bech yet3abba bil add to cart 
    //setCartItems houwa fonction bech yajouti item lel cartItems kil update
    const [cartItems, setCartItems] = useState([]);

    const url="http://localhost:4000"
    // token 
    const [token, setToken] = useState("");

    //addToCart houwa fonction bech yajouti item lel cartItems
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

//itemToRemove bech tfassa5 item mel cartItems
//setCartItems ta3mel refréch lel carteitem
//prevItems houwa elli mawjoud fil cartItems 7aliyan
//el filter y3addi ken el 7ajet elli ismhom mo5talef 3ala isem el 7aja elli t7eb tna7aha 
//item => item.name !== itemToRemove.name ma3neha ithakén ism el 7aja diff lel isme el 7aja elli t7eb tna7aha 5alleha fil cartItems
    const removeFromCart = (itemToRemove) => {
        setCartItems((prevItems) =>
            prevItems.filter(item => item.name !== itemToRemove.name)
        );
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    // lenna bech kif login w ta3mel refresh lel page yab9a mato5rejech wa7adha 
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);
    //contextValue houwa objet bech yajouti les variables et les fonctions lel context
    const contextValue = {
        formation_list,
        cartItems,
        addToCart,
        removeFromCart,
        calculateTotalPrice,
        url,
        token,
        setToken
        
    };

    //Provider bech yajouti les variables et les fonctions lel context
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;