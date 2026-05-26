const { Router } = require("express");
const postsController = require("../controllers/postsController");
const validate = require("../middlewares/validationMiddleware");
const postSchema = require("../validators/postValidator");

const router = Router();

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", validate(postSchema), postsController.createPost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
