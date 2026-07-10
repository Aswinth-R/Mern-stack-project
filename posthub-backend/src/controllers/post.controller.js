import { Post } from "../models/post.model.js";

// Create a post
const createPost = async (req, res) => {
    try {
        const { name, description, age} = req.body;

        if(!name || !description || !age) {
            return res.status(400).json({ message: "All field are required" });
        }

        const post = await Post.create({ 
            name,
            description,
            age,
            createdBy: req.user.id 
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });
    
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error
        });
    }
}

// Read all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("createdBy", "username");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", 
            error
        });
    }
}

// update post
const updatePost = async (req, res) => {
    try {
        // check if update empty {}
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }
    const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        // check owner 
        if (post.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not your post" });
        }

const updatedpost = await Post.findByIdAndUpdate(req.params.id, req.body, 
    {new: true});

    res.status(200).json({ 
        message: "Post updated successfully",
        updatePost
    });       
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", 
            error
        });
    }
}

// delete post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        // check owner 
        if (post.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not your post" });
        }
       await Post.findByIdAndDelete(req.params.id);
        
    res.status(200).json({
        message: "Post successfully deleted"
    });

    } catch (error) {
         res.status(500).json({
            message: "Internal Server error", 
            error
        });
    }
}


// Get only logged in user's posts
const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({
            createdBy: req.user.id
        }).populate("createdBy", "username");

        res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error
        });
    }
};



export {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getMyPosts
}