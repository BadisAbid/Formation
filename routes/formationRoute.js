import express from 'express';
import { addFormation, listFormation,removeFormation} from '../controllers/formationController.js';
import multer from 'multer';

//  bech na3mlou express router bech najmou na3mlou get post  methode etc...
const formationRouter = express.Router();

//image
// ennou el image enregistre fil uploads file
//cb ma3neha call back
const storage = multer.diskStorage({
    destination :"uploads",
    filename :(req,file,cb)=>{
       return cb(null,`${Date.now()}${file.originalname}`)
       //hethi bech ya3mel rename lel file wil file haka y7otto fil uploeads b hethi ${file.originalname}
        //w ya3mel unique name likol tsawer b  héthy ${Date.now()}
    }
})
//bech store the image in the uploads folder
const upload = multer({storage:storage});   

// tawa bech na3mlou post request 
//post(bech tab3eth data)
formationRouter.post("/add",upload.single("image"),addFormation);
// bech nzidou formationlist lenna 
formationRouter.get("/list",listFormation);
//bech na3mlou delete
formationRouter.post("/remove",removeFormation);








export default formationRouter;
// nemchiyou server.js bech na3mlou setup lel route hethi