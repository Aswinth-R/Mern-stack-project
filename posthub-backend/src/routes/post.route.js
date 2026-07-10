import {Router} from "express";
import { createPost, deletePost, getMyPosts, getPosts, updatePost } from "../controllers/post.controller.js";
import verifyToken from "../middlewares/authMiddleware.js";
import varifyAdmin from "../middlewares/admin.middleware.js";

const router = Router();

router.route('/create').post(verifyToken, createPost);
router.route('/getPosts').get(getPosts);
router.route('/update/:id').patch(verifyToken, updatePost);
router.route('/delete/:id').delete( verifyToken, varifyAdmin, deletePost);
router.route('/getMyPosts').get(verifyToken, getMyPosts);

export default router;