const router = require ("express").Router();
const User = require ("../models/user");
const bcrypt = require ("bcrypt");


//Register
router.post("/register", async (req,res)=>{
    

    try{
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPass,
    });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(e){
            res.status(500).json(e);
    }

});

    //Login
    router.post("/login", async(req,res)=>{
        try{
            const user = await User.findOne({
                email:req.body.email
            });
            !user && res.status(404).json("user not found");

            const validPass = await bcrypt.compare(req.body.password, user.password)
            !validPass && res.status(400).json("Wrong password")
        
            
            res.status(200).json(user);
        }catch(e){
            res.status(500).json(e);
        }
    })

module.exports = router;