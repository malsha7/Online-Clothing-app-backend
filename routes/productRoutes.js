const router = require("express").Router();
const {createProduct,getProducts,getProductsByGender,getProductsByGenderAndCategory,uploadImage,getImages}= require ('../controllers/productController');
const {productValidation,validationRules}= require ('../utils/productUtils');
const upload = require('../utils/multer');



// Route for product creation

router.post('/products',validationRules,productValidation,createProduct);

router.post('/products/:productId/upload', upload.array('images', 2), uploadImage);
router.get('/products/:productId/images/:imageName',getImages);


// Route for get all produt
router.get('/products',getProducts);

router.get('/products/:gender', getProductsByGender);

router.get('/products/:gender/:category', getProductsByGenderAndCategory);



module.exports = router;