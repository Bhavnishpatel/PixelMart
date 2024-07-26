const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true   
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        default:'buyer'
    },
    uploads:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    purchased:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"         
    }],
    favoutrites:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]
})

const User=mongoose.model('User',userSchema);

module.exports=User;