const { Schema, Mongoose, default: mongoose } = require("mongoose");
// const { default: Email } = require("next-auth/providers/email");

const UserSchema= new Schema({
    name:String,
    email:{
        type:String,
        require: true
    },
    phoneNo:{
        type:Number
    },
    password:{
        type:String,
        require:true
    }
})

export const User=mongoose.models.Users || mongoose.model("Users", UserSchema)