import { findPostById } from '../repository/post.repository.js';

export const hasRole = role => (req, res, next) => {
    const check = req.principal.roles.includes(role.toUpperCase().trim());
    return check ? next() : res.status(403).json({ message: 'Access denied' });
}

export const isOwner = paramName => (req, res, next) => req.params[paramName] === req.principal.userName ? next() : res.status(403).json({ message: 'Access denied' });

export const isOwnerOrHasRole = (paramName, role) => (req, res, next) => req.params[paramName] === req.principal.userName || req.principal.roles.includes(role.toUpperCase().trim()) ? next() : res.status(403).json({ message: 'Access denied' });

export const isPostAuthorOrHasRole = (...roles) => async (req, res, next) => {
    try {
        const post = await findPostById(req.params.id);
        if (!post) return res.status(404).json({ message: `Post with id ${req.params.id} not found` });
        const { userName, roles: userRoles } = req.principal;
        return post.author === userName || roles.some(r => userRoles.includes(r.toUpperCase().trim()))
            ? next()
            : res.status(403).json({ message: 'Access denied' });
    } catch (e) {
        next(e);
    }
};


