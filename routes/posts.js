import express from "express";
import {
    getPost,
    getPosts,
    createPOst,
    updatePost,
    deletePost,
} from "../controllers/postController.js";
const router = express.Router();

//Get all posts
router.get("/", getPosts);

//Get single post by id
router.get("/:id", getPost);

//Create a post
router.post("/", createPOst);

// Update a post
router.put("/:id", updatePost);

// Delete a post
router.delete("/:id", deletePost);

export default router;
