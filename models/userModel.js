import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    cartData: { type: Object, default: {} } //elli bech yechrih el user bech yet9ayed fil cartdata mte3ou b somo b quantité b kollo 3ibara panier 
                                            //w kol user 3andou cartdata mte3ou     
} ,{minimize:false} )  // tebe3 el panier

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;