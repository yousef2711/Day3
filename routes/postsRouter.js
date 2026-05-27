const { Router } = require("express");
const postsController = require("../controllers/postsController");
const validate = require("../middlewares/validationMiddleware");
const postSchema = require("../validators/postValidator");
const authenticate = require('../middlewares/authenticate');

const router = Router();

// All routes protected
router.post('/', authenticate, validate(postSchema), postsController.createPost);
router.get('/', authenticate, postsController.getAllPosts);
router.get('/:id', authenticate, postsController.getPostById);
router.patch('/:id', authenticate, validate(postSchema), postsController.updatePostById);
router.delete('/:id', authenticate, postsController.deletePostById);

module.exports = router;
