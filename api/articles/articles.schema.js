const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // Question 2.	Ajouter l’énumération dans le schéma de article.model.js avec deux valeurs : draft, published
  state: {
    type: String,
    required: [true, "state is required"],
    enum: {
      values: ["draft", "published"],
      message: "{VALUE} unknown",
    },
  },
});

let Article;

module.exports = Article = model("Article", articleSchema);

/*async function test() {
  const articles = await Article.find().populate({
    path: "user",
    select: "-password",
    match: { name: /ben/i },
  });
  console.log(articles.filter((article) => article.user));
}

test();*/
