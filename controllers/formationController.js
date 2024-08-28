// lenna bech na3mlou les api bech najmou nzidou formation lel database
import formationModel from "../models/formationModel.js";
//pre-built in node.js
import fs from "fs";





//add formation item 
const addFormation = async (req, res) => {
// store uploeaded file name in  this variable elli houwa image_filename kima n9olo y5abbi fih url mta3 taswira
let  image_filename = `${req.file.filename}`;
//new formation
// maw 3malna formation schema bech  n3arfou 3al formation taw bech n7otto kol wa7da wel value mte3ha
const formation = new formationModel({
    name: req.body.name,
    description: req.body.description,
    duree: req.body.duree,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
   
})
try {
    await formation.save(); //to save the formation item 
    // res.status(201).json({ message: "Formation added successfully" });
    res.json({success:true,message:"Formation ajoutée avec succès"})
} catch (error) {
    console.log(error)
    // res.status(500).json({ message: "Formation not added" });
    res.json({success:false,message:"Erreur, formation non ajoutée"})
}
}
// kif bech testi fil postman http://localhost:4000/api/formation/add

// bech na3mlou list formation
// all formation list
const listFormation = async (req,res)=>{
    try {
        const formations = await formationModel.find({});// ma3neha jibli formation item el kol min formationModel 
        //w t7othom fi formations {} ma3neha me8ir chart
        res.json({success:true,data:formations}); //data:formations ma3neha el bayanét el mourad erselha hiya formations
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }

}
// kif bech testi fil postman http://localhost:4000/api/formation/list


//remove formation item
const removeFormation = async (req,res)=>{
try {
    const formation = await formationModel.findById(req.body.id); // to find the formation item that we want to delete 
    //req.body.id  bech ya3ref el id mte3ha
    // tawa lazemna enfas5ou el taswira min uploads folder
    fs.unlink(`uploads/${formation.image}`,()=>{} ); // to remove the image from the uploads folder formation.image bech ya3ti isem taswira el msajla
    // tawa bech nfas5ou el taswira mil database bil id
    await formationModel.findByIdAndDelete(req.body.id); // to remove the formation item from the database 
    res.json({success:true,message:"Formation removed successfully"});
    
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Formation not removed"});
    
}
}

// kif bech testi fil postman http://localhost:4000/api/formation/remove








//lezemna export objet we7ed  tawa lezemna route
export {addFormation,listFormation,removeFormation}