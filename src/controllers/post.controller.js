import * as postService from '../services/post.service';

export const addPost = async  (req, res) => {
    const post = await postService.addPost(req.params.user, req.body);
    if (post) {
        res.status(201).json(post);
    } else {
        res.status(409)
    }
}

export const findPostById = async (req, res) => {
    const post = await postService.findPostById(req.params.postId);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404);
    }
}

export const addLike = async (req, res) => {
    const success = await postService.addLike(req.params.postId);
    if (success) {
        res.status(204)
    } else {
        res.status(404);
    }
}

export const findPostsByAuthor = async (req, res) => {
    const posts = await postService.findPostsByAuthor(req.params.user);
    if (posts) {
        res.status(200).json(posts);
    } else {
        res.status(404);
    }
}

export const addComment = async (req, res) => {
    const post = await postService.addComment(req.params.postId, req.params.commenter, req.body);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404);
    }
}

export const deletePost = async (req, res) => {
    const post = await postService.deletePost(req.params.postId);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({
            timestamp: new Date().toISOString(),
            status: 404,
            error: "Not Found",
            message: `Post with id ${req.params.postId} not found`,
            path: req.path
        });
    }
}

export const findPostByTags = async (req, res) => {
    const posts = await postService.findPostsByTags(req.query.values);
    if (posts) {
        res.status(200).json(posts);
    } else {
        res.status(404);
    }
}

export const findPostsByPeriod = async (req, res) => {
    const posts = await postService.findPostsByPeriod(req.query.dateFrom, req.query.dateTo);
    if (posts) {
        res.status(200).json(posts);
    } else {
        res.status(404);
    }
}

export const updatePost = async (req, res) => {
    const post = await postService.updatePost(req.params.postId, req.body);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404);
    }
}
