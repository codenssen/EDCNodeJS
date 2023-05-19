const articlesService = require("./articles.service");

class ArticlesController {

    async getAll(req, res, next) {
        try {
            const articles = await articlesService.getAll();
            res.json(articles);
        }

        catch(err) {
            next(err);
        }
    }

   
    async create(req, res, next) {
        try {
            const article = await articlesService.create(req.body);
            res.status(201).json(article);
        }
        catch(err) {
            next(err);
        }
    }



}


module.exports = new ArticlesController();