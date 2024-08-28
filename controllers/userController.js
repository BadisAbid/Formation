import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";





//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Utilisateur non trouvé" });
        }
        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Mot de passe incorrect" });
        }
        //create token
        const token = createToken(user._id);
        res.json({ success: true, token }); 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Erreur de la connexion" });
    }

}
// kif bich na3mlou token lazemna user id  wil jwt secret
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register user
const registerUser = async (req, res) => {
    const{name,email,password} = req.body; // lenna bech yjib el name email w password mil fromulaire
    try {
        const exists = await userModel.findOne({email}); 
        if(exists){
          return  res.json({success:false,message:"Utilisateur existe déjà"}); // bech yjib message mte3 user already exists  
          //success:false 5ater mazelna ma3malnech compte

        }
        // validate email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Email valide"});
        }
        // validate password length
        if(password.length<8){
            return res.json({success:false,message:"le mot de passe doit contenir au moins 8 caractères"});
        }
        //tawa hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user
        const newUser = new userModel({
            name: name, // name ye5ou name mta3 el formulaire
            email: email,
            password: hashedPassword
        });

        // tawa save lil user fil database
       const user = await newUser.save();
       //create token
         const token = createToken(user._id);
        //send token to client
        res.json({success:true,token});


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Erreur lors de l'inscription"});
        
    }
}





export { loginUser, registerUser };