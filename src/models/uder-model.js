const mongoose = require('mongoose');
const validator = require('validator');
var bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
        },
        email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email address is invalid');
            }
        }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 6,
            validate(value){
        if(value.toLowerCase().includes('password')){
            throw new Error('Password cannot contain "password"')
        }

        if(value.length < 6){
            throw new Error('Password should be more than 6 characters')
        }
            }
        }

},
{
    timestamps: true
})

    //hash plain text before save() to database
    userSchema.pre('save', async function (next){
        const user = this;
     
        if(user.isModified('password')){
            let salt = bcrypt.genSaltSync(10);
            user.password = await bcrypt.hash(user.password, salt)
        }
     
        next()
     })

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;