const Post = require("../models/Post");
const User = require ("../models/user")
const router = require("express").Router();

//create a post
router.post("/", async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(e){
        res.status(500).json(e);
    }
})

//update a post
router.put("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Post Updated");
        }else{
            res.status(403).json("You can only edit you own post");
        }
    }catch(e){
        res.status(500).json(e);
    }
})

//delete a post
router.delete("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne({$set:req.body});
            res.status(200).json("Post Deleted");
        }else{
            res.status(403).json("You can only delete you own post");
        }
    }catch(e){
        res.status(500).json(e);
    }
})
//like a post
router.put("/:id/like", async(req,res)=>{
        try{
            const post = await Post.findById(req.params.id);
            if(!post.likes.includes(req.body.userId)){
                await post.updateOne({$push:{likes:req.body.userId}});
                res.status(200).json("You liked this post");
            }else{
                await post.updateOne({$pull:{likes:req.body.userId}});
                res.status(200).json("You disliked this post");
            }
        }catch(e){
            res.status(500).json(e);
        }
})
//get a post
router.get("/:id", async(req,res)=>{
    try{
        const post =await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(e){
        res.status(500).json(e);
    }
})
//get timeline posts
router.get("/timeline/:userId", async(req,res)=>{
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPost = await Post.find({userId : currentUser._id});
        const friendsPost = await Promise.all(
            currentUser.following.map((friendId) =>{
                return Post.find(({userId: friendId}));
            })
        );
        res.status(200).json(userPost.concat(...friendsPost));
    }catch(e){
        res.status(500).json(e);
    }
})

//get user own posts
router.get("/profile/:username", async(req,res)=>{
    try{
        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts);
    }catch(e){
        res.status(500).json(e);
    }
})

module.exports = router;