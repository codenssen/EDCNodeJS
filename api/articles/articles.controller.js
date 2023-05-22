const UnauthorizedError = require("../../errors/unauthorized");
const articlesService = require("./articles.service");

class ArticlesController {

    async getAll(req, res, next) {
        try {
            const articles = await articlesService.getAll();
            res.json(articles);
        }

        catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const article = await articlesService.get(id);
            if (!article) {
                throw new NotFoundError();
            }
            res.json(article);
        } catch (err) {
            next(err);
        }
    }


    async create(req, res, next) {
        try {

            // 7. Lors de la création, faites un enregistrement en utilisant l’id de l’utilisateur connecté

            const user = req.user;
            const data = { user, ...req.body };

            const article = await articlesService.create(data);
            res.status(201).json(article);
        }
        catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;
            const articleModified = await articlesService.update(id, data);
            res.json(articleModified);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {

            const id = req.params.id;
            const user = req.user;

            // 6. Faites en sorte que la modification et la suppression (dans le contrôleur) s’effectuent seulement si l’utilisateur est « admin » (propriété « role » sur l’utilisateur).

            if (user.role == "admin") {
                await articlesService.delete(id);
                req.io.emit("article:delete", { id }); // temps réel
                res.status(204).send();
            }
            else {
                throw new UnauthorizedError();
            }



        } catch (err) {
            next(err);
        }
    }



}


module.exports = new ArticlesController();