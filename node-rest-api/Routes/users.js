const router = require ("express").Router();
const bcrypt = require ("bcrypt");
const User = require("../models/user");

//update users
router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(e){
                return res.status(500).json(e);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account updated")
        }catch(e){
            return res.status(500).json(e);
        }
    }else{
        return res.status(403).json("you can update only your account")
    }
})
//delete users
router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account deleted")
        }catch(e){
            return res.status(500).json(e);
        }
    }else{
        return res.status(403).json("you can delete only your account")
    }
})

//get a users 
router.get("/", async(req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
                    ? await User.findById(userId) 
                    : await User.findOne({username:username});
        const {password,isAdmin, ...other} = user._doc;
        res.status(200).json(other);
    }catch(e){
        res.status(500).json(e);
    }
})

//get friends
router.get("/friends/:userId", async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map((friendId)=>{
                return User.findById(friendId);
            })
        )
        let friendList = [];
        friends.map(friend =>{
            const {_id,firstname, lastname, username,profilePic} = friend;
            friendList.push({_id,firstname,lastname,username,profilePic})
        });
        res.status(200).json(friendList);
    }catch(e){
        res.status(500).json(e);
    }
})

//follow a user
router.put("/:id/follow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId))
            {
                await user.updateOne({$push:{followers: req.body.userId}});
                await currentUser.updateOne({$push:{following: req.params.id}});
                res.status(200).json("started following");
            }else{
                res.status(403).json("already following");
            }
        }catch(e){
            res.status(500).json(e);
        }
    }else{
        res.status(403).json("Same account");
    }
})
//unfollow a user
router.put("/:id/unfollow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId))
            {
                await user.updateOne({$pull:{followers: req.body.userId}});
                await currentUser.updateOne({$pull:{following: req.params.id}});
                res.status(200).json("stopped following");
            }else{
                res.status(403).json("aren't following");
            }
        }catch(e){
            res.status(500).json(e);
        }
    }else{
        res.status(403).json("Same account");
    }
})
module.exports = router;