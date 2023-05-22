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

}


module.exports = new ArticleService();