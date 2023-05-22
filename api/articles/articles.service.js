const Article = require("./articles.schema");

class ArticleService {

    get(id) {
        return Article.findById(id);
    }

    getAll() {
        return Article.find({});
    }

    create(data) {
        const article = new Article(data);
        return article.save();
    }

    update(id, data) {
        return Article.findByIdAndUpdate(id, data, { new : true});
    }

    delete(id) {
        return Article.deleteOne({ _id : id});
    }

    // 4.	Créer le endpoint public pour afficher les articles d’un utilisateur. Le endpoint doit être sous la forme api/users/:userId/articles
    async getArticles(id) {
        const articles = await Article.find({user : id}).populate("user", "-password");
        return articles;
      }

}


module.exports = new ArticleService();