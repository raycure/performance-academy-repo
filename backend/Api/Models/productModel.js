import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {    
        name: {
            type: String,
            required: [true, 'please enter product name']
        },
        password:{
            type: String,
            required: [true, 'please enter a password']
        }
    },
    {
        timestamps: true
    }
)

const TestProducts = mongoose.model("TestProducts", ProductSchema);

export default TestProducts;

