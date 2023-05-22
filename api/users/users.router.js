const express = require("express");
const usersController = require("./users.controller");
const authMiddleware = require("../../middlewares/auth");
const router = express.Router();

router.get("/", authMiddleware, usersController.getAll);
router.get("/:id", authMiddleware, usersController.getById);

// 4.	Créer le endpoint public pour afficher les articles d’un utilisateur. Le endpoint doit être sous la forme api/users/:userId/articles
router.get("/:userId/articles", usersController.getArticles);

router.post("/", authMiddleware, usersController.create);
router.put("/:id", authMiddleware, usersController.update);
router.delete("/:id", authMiddleware, usersController.delete);

module.exports = router;
