const { validationResult, check } = require("express-validator");

exports.bookCreationValidation = [
    check("title")
        .not()
        .isEmpty()
        .withMessage("Book title should not be blank")
        .exists()
        .isString()
        .withMessage("Book title should be string")
        .isLength({ min: 5, max: 50 })
        .withMessage("Book title should be more than 5 and less than 50 character")
        .trim(),
    check("author")
        .not()
        .isEmpty()
        .withMessage("Author name should not be blank")
        .exists()
        .isString()
        .withMessage("Author name should be string")
        .isLength({ min: 3, max: 30 })
        .withMessage("Author name should be more than 3 and less than 30 character")
        .trim(),
    check("ISBN")
        .not()
        .isEmpty()
        .withMessage("ISBN should not be blank")
        .trim(),
    check("quantity")
        .not()
        .isEmpty()
        .withMessage("Quantity should not be blank")
        .exists()
        .isNumeric()
        .withMessage("Quantity should be number")
        .trim(),
    function (req, res, next) {
        var errorValidation = validationResult(req);
        if (errorValidation.length > 0) {
            return res.status(400).json({
                title: "An error occured",
                error: errorValidation,
            });
        }
        next();
    },
];