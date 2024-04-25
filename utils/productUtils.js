const {check, validationResult} = require("express-validator")

const gender = ["men", "women", "kid"];
const category = ["apperal", "casual", "t-shirt", "trouser"];
const size = ["S", "M", "L", "XL"];

//validate product details
const validationRules = [

    check("title", "please provide product title")
    .notEmpty(),

    check("price", "please provide product price")
    .notEmpty(),

    check("price", "please provide valide format in price")
    .isFloat(),

    check("description", "please provide description")
    .notEmpty(),

    // check("images", "please provide image URL")
    // .notEmpty(),

    check("gender", "please provide gender type(men,women,kid)")
    .notEmpty(),

    check("gender", "Invalid Gender type(men,women,kid)")
    .isIn(gender),

    check("category", "please provide  category(apperal,casual,t-shirt,trouser)")
    .notEmpty(),

    check("category", "Invalid category(apperal,casual,t-shirt,trouser)")
    .isIn(category),

    check("size", "please provide size(S,M,L,XL)")
    .notEmpty(),

    check("size", "Invalid Size(S,M,L,XL)")
    .matches(/[SMLXL]/).isUppercase(),

    check("color", "please provide color")
    .notEmpty(),

    

];

//chek validation results
const productValidation = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(420).json({ errors: errors.array() });
    }
    next();
}



  

module.exports = {validationRules,productValidation}