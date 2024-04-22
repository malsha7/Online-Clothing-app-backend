const Product = require('../models/product');
const fs = require('fs');
const Joi = require('joi');

const createProduct = async (req, res) => {

    // Extract user details from the request body
    const { title, price,  description, images, gender, category, size, color  } = req.body;

    try {
        // Check if the product already exists
        const productExists = await Product.findOne({ title });
        if (productExists) {
            return res.status(400).json({ message: 'Product already exists' });
        }

        // Create a new product
        const product = new Product({
            title:title,
            price:price,
            description:description,
           // images:images,
            gender:gender,
            category:category,
            size:size,
            color:color
        });


       

        // Save the new product to the database
        await product.save();

        console.log("product sucessfully created")

        res.status(201).json({
            message: 'Product created successfully',
            productId: product._id,
            title:product.title,
            price:product.price,
            description:product.description,
            images:product.images,
            gender:product.gender,
            category:product.category,
            size:product.size,
            color:product.color
           
        });
    
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

const uploadImage = async (req, res) => {
    try {
        const _id = req.params.productId;
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const images = req.files.map(file => ({
            name: file.originalname,
            data: fs.readFileSync(file.path),
            contentType: file.mimetype
        }));

        product.images.push(...images);
        await product.save();

        req.files.forEach(file => {
            fs.unlinkSync(file.path); // Remove the temporary file
        });

        res.send('Images uploaded successfully');
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).send('Error uploading images');
    }
};


// const getProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productsWithUrls = products.map(product => ({
            productId: product._id,
            title:product.title,
            price:product.price,
            description:product.description,
            images: product.images.map(image => ({
                name: image.name,
                url: `http://localhost:8000/images/${product._id}/${image.name}` // Assuming images are served from /images route
            })),
            gender:product.gender,
            category:product.category,
            size:product.size,
            color:product.color
        }));
        res.json(productsWithUrls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Validation schema for gender parameter
const genderSchema = Joi.string().valid('men', 'women', 'kid').required();
const categorySchema = Joi.string().valid('apperal', 'casual', 't-shirt', 'trouser').required();

const getProductsByGender =async (req, res) => {
    const { error } = genderSchema.validate(req.params.gender);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    const { gender } = req.params;
    
    // Filter the products based on the requested gender
    const filteredProducts = await Product.find({gender});
    if (filteredProducts) {
        res.status(200).json(filteredProducts);
    }
    
  };


  const getProductsByGenderAndCategory =async (req, res) => {
    const { error:genderError } = genderSchema.validate(req.params.gender);
    const { error:categoryError } = categorySchema.validate(req.params.category);
    if (genderError || categoryError) {
      return res.status(400).json({ error: genderError || categoryError });
    }
  
    const { gender,category } = req.params;
    
    // Filter the products based on the requested gender and category
    const filteredProducts = await Product.find({gender, category});
    if (filteredProducts) {
        res.status(200).json(filteredProducts);
    }
    
  };


module.exports = {createProduct,getProducts,getProductsByGender,getProductsByGenderAndCategory,uploadImage};