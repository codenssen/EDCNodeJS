const express = require("express");
const articlesController = require("./articles.controller");
const router = express.Router();

router.get("/", articlesController.getAll);
router.post("/", articlesController.create);

module.exports = router;