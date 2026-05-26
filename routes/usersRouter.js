const { Router } = require("express");
const usersController = require("../controllers/usersController");

const router = Router();

router.post("/", usersController.createUser);
router.get("/count", usersController.countUsers);
router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.delete("/:id", usersController.deleteUser);
router.patch("/:id", usersController.updateUser);

module.exports = router;
