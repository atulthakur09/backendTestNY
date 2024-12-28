const userLoginValidationSchema = {
    email: {
        exists: {
            errorMessage: 'email is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be blank'
        },
        // isEmail: {
        //     errorMessage: 'Incorrect E-mail or password1'
        // },
        normalizeEmail: true,
        trim: true 
    },
    password: {
        exists: {
            errorMessage: 'password is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be blank'
        }, 
        isLength: {
            options: { min: 8, max: 128},
            // errorMessage: 'Incorrect E-mail or password2'
        },
        trim: true 
    }
}

module.exports = userLoginValidationSchema