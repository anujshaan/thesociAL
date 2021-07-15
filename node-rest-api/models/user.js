const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:4,
        max:10,
        unique:true
    },
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        max:20,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:6,
        max:20
    },
    profilePic:{
        type:String,
        default:""
    },
    coverPic:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[] 
    },
    following:{
        type:Array,
        default:[] 
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:50
    },
    current:{
        type:String,
        max:20
    },
    home:{
        type:String,
        max:20
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }

},
{ timestamps:true }
);

module.exports = mongoose.model("User", userSchema);