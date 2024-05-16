const { default: mongoose } = require("mongoose");
const User = require('../model/user_model'); 
const { compareSync } = require("bcryptjs");


exports.getAllUsers = async (req, res)=>{
    try{
        usersAll = await User.find()
        if(!usersAll){
            return res.status(400).send({message: "Failed to get all the users", usersAll})
        }

        res.status(200).send({message : "Managed to get all users", usersAll})
        
    }catch(err){
        res.status(500).send("Could not get all the users", err)
    }
}
exports.getOne = async (req, res)=>{
    try{
        const {email} = req.body

        console.log(email)
        if(!email){
            return res.status(400).send("Email cannot be empty") 
        }

        let user  = await User.findOne({email})

        if(!user){
            return res.status(400).send({message:"Cannot get user with email : ", email}) 
        }

        res.status(200).send({message: "Got user by email :", email})


    }catch(err){
        res.status(500).send({message:"Could not get the user", err})
    }
}
exports.updateOne = async (req, res)=>{
    try{
        
        const id = req.params.id

        console.log(id)
        if(!id){
            return res.status(400).send("Email cannot be empty") 
        }

        let updatedUser  = await User.findByIdAndUpdate(id, req.body)


        if(!updatedUser){
            return res.status(404).send({message:"Cannot get user with email : ", email}) 
        }
        await updatedUser.save()

        res.status(200).send({message: "Got user by email :", updatedUser})


    }catch(err){
        res.status(500).send({message:"Could not get the user", err})
    }
}
  
exports.deleteUser = async (req, res ) => {
    try {
const id = req.params.id;

const user = await User.findById(id);
if (User) {
    return res.status(404).json({ message: 'user not found '});

}

await User.findByIdAndDelete(id);

res.json({ message: 'User deleted successfully' }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', err });
    }

};

exports.deleteAllUsers = async (req, res) => {
    try {

        await User.deleteMany({});

        req.json({ message: 'All Users deleted successfully '});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', err});
    }
};



exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.user_dBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.admin_dBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };