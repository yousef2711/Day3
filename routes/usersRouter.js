const { Router } = require("express");
const usersController = require("../controllers/usersController");
const validate = require("../middlewares/validationMiddleware");
const { signUpSchema, signInSchema } = require("../validators/authValidator");
const authenticate = require("../middlewares/authenticate");
const restrictTo = require("../middlewares/restrictTo");

const router = Router();

// Public
router.post('/sign-up', validate(signUpSchema), usersController.signUp);
router.post('/sign-in', validate(signInSchema), usersController.signIn);

// Protected - admin only
router.get('/count', authenticate, restrictTo(['admin']), usersController.countUsers);
router.get('/', authenticate, restrictTo(['admin']), usersController.getAllUsers);
router.get('/:id', authenticate, restrictTo(['admin']), usersController.getUserById);
router.patch('/:id', authenticate, restrictTo(['admin']), validate(signUpSchema), usersController.updateUser);
router.delete('/:id', authenticate, restrictTo(['admin']), usersController.deleteUser);

module.exports = router;
