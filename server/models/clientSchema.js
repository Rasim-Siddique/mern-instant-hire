const mongoose=require('mongoose');

const clientSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    workEmail:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    companyName:{
        type:String,
        required:true,
    },

    companyLocation:{
        type:String,
        required:true,
    },
    companySize:{
        type:String,
        required:true,
    }
    
})


const Client=mongoose.model('CLIENT', clientSchema);

module.exports=Client