const mongoose=require('mongoose')

const userSchema = mongoose.Schema({
    prenom :{
        type:String ,
        required : true
    },
    nom :{
        type:String ,
        required : true
    },
    password :{
        type:Number ,
        required : true
    },
    email :{
        type:String ,
        required : true
    },
    Date:{
        type: Date ,
        required : true
    },
    status :{
        type:Boolean,
        required : true
    },
});

module.exports = User = mongoose.model('user',userSchema);