const mongoose=require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password :{
        type:  String,
        required : true
    },
    email :{
        type:String ,
        required : true
    },
    date:{
        type: Date ,
        required : true
    },
    status :{
        type:Boolean,
        //required : true,
        default: false,
    },
}, {timestamps: true});
const  User = mongoose.model('user',userSchema)
module.exports = User;