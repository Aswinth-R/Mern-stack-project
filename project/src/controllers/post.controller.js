import { Post } from "../models/post.model.js";

// Create a post
const createPost = async (req, res) => {
    try {
        const { name, description, age} = req.body;

        if(!name || !description || !age) {
            return res.status(400).json({ message: "All field are required" });
        }

        const post = await Post.create({ name, description, age });

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
        const posts = await Post.find();
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
        if (Object.keys.length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }
const post = await Post.findByIdAndUpdate(req.params.id, req.body, 
        {new: true});

    if (!post) {
    res.status(404).json({
            message: "Post not found"
        });
    }

res.status(200).json({ 
    message: "Post updated successfully",
    post
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
        const deleted = await Post.findByIdAndDelete(req.params.id, req.body);
        if (!deleted) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
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


export {
    createPost,
    getPosts,
    updatePost,
    deletePost
}