const mongoose = require("../../common/database")();

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        text: true,
    },
    cat_id:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    color_id:{
        type: mongoose.Types.ObjectId,
        ref: "Color",
        
    },
    
    slug:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: null,
    },
    thumbnail:{
        type: String,
        default: null,
    },
    price:{
        type: Number,
        default: 0,
    },
    importprice:{
        type: Number,
        default: 0,
    },
    memory:{
        type: Number,
        default: null,
    },
    ram:{
        type: Number,
        default: null,
    },
    featured:{
        type: Boolean,
        default: false,
    },
    promotion:{
        type: String,
        default: null,
    },
    warranty:{
        type: String,
        default: null,
    },
    accessories:{
        type: String,
        default: null,
    },
    quantity:{
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const ProductModel = mongoose.model("Product", productSchema, "products");
module.exports = ProductModel;