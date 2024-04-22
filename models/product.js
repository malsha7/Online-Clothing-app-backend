const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        maxlength: [500, "title cannot exceed 100 characters"],
        required: [true, "title is required"],
        
    },

    price: {
        type: mongoose.Decimal128,
        required: [true, "Price is required"],
    },

    description: {
        type: String,
        maxlength: [1000, "description cannot exceed 1000 characters"],
        required: [true, "description is required"],
        
    },

    images: [{
        name: String,
        url: String,
        contentType: String
    }],

    gender: {
        type: String,
        enum: {
            values: [
                "men",
                "women",
                "kid"
                
            ],
            message: "Invalid user type!"
        },
        required: [true, "Gender type is required!"]
    },

    category: {
        type: String,
        enum: {
            values: [
                "apperal",
                "casual",
                "t-shirt",
                "trouser"
                
            ],
            message: "Invalid category type!"
        },
        required: [true, "Category is required!"]
    },

    size: {
        type: String,
        validate: {
            validator: (value) => {
                return /[SMLXL]/.test(
                    value
                );
            },
            message: (props) => `Invalid size format!`,
        },
        required: [true, "size is required!"]
    },

    color: {
        type: String,
        required: [true, "Color is required"],
    },   
    
}, {
    timestamps: false, // Automatically manage createdAt and updatedAt fields
    versionKey:false
   // timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;