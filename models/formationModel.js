// using models we can store the formation to database
import mongoose from "mongoose";

const formationSchema = new mongoose.Schema({
    //example itha kén ma7attinech ism lel formation jdida elli t7eb tzidha mahouch bech yhezha lel store 5ater zedna required true
    name: { type: String, required: true },
    description: { type: String, required: true },
    duree: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }

})

//tawa bil schema hethi bech na3mlou model

const formationModel = mongoose.models.formation || mongoose.model("formation", formationSchema);
//tawa el model ta3mal najmou na3mlou el model hatha mara bark mongoose.model("Formation", formationSchema); leken kif na3mlou run lel file hatha 
//marra o5ra bech y3awed creation mta3 el model marra o5ra donc nzidou héthi mongoose.models.formation||
// itha kén el model c'est déja  mawjoud lenna mongoose.models.formation bech ye5dem itha ken mahouch mawjoud bech ya3mel model jdid
//tawa lazemna controller
export default formationModel;