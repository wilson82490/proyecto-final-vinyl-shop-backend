import mongoose from 'mongoose';

const vinilosSchema = new mongoose.Schema({
    title: 
    { type: String, 
      required: true,
      trim: true,
    },
    artist: { 
        type: String, 
        required: true,
        trim: true
    },
    year: { 
        type: Number, 
        required: true 
    },

    description: {
        type: String,
        required: true,
        trim: true,
        default: ""
    },
    genre: { 
        type: String, 
        required: true },

    image: {
        type: String,
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    feature: {
        type: Boolean,
        default: false
    }
},

    { 
        timestamps: true 
    },
);

const Vinilos = mongoose.model('Vinilos', vinilosSchema);

export default Vinilos;