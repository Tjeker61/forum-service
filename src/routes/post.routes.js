import { Router } from "express";
import * as postController from "../controllers/post.controller";

const router = Router();

router.post('/forum/post/:user', postController.addPost);
router.get('/forum/post/:postId', postController.findPostById);
router.patch('/forum/post/:postId/like', postController.addLike);
router.get('/forum/posts/author/:user', postController.findPostsByAuthor);
router.patch('/forum/post/:postId/comment/:commenter', postController.addComment);
router.delete('/forum/post/:postId', postController.deletePost);
router.get('/forum/posts/tags', postController.findPostByTags);
router.get('/forum/posts/period', postController.findPostsByPeriod);
router.patch('/forum/post/:postId', postController.updatePost);

export default router;