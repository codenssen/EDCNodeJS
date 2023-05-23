const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const User = require("../api/users/users.model");
const Article = require("../api/articles/articles.model");

describe("Tester API articles", () => {

    let token;

    const USER_ID = "fake";

    const MOCK_DATA_USER = [
        {
            _id: USER_ID,
            name: "ana",
            email: "nfegeg@gmail.com",
            password: "azertyuiop",
        },
    ];

    const MOCK_DATA_ARTICLE = [
        {
          _id: "1",
          user: USER_ID,
          title: "Titre 1",
          content : "Contenu 1",
          state : "draft",
        },
      ];

    beforeEach(() => {
        token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
        mockingoose(User).toReturn(MOCK_DATA_USER, "find");
        mockingoose(Article).toReturn(MOCK_DATA_ARTICLE, "find");
        mockingoose(Article).toReturn(MOCK_DATA_ARTICLE, "delete");

    });

  
    test('[Articles] Get All', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('x-access-token', token);
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('[Articles] Create article', async () => {
        const res = await request(app)
            .post('/api/articles')
            .send({ title: 'Article test', content: 'Content test', userId: USER_ID, state: "draft" })
            .set('x-access-token', token);
        expect(res.status).toBe(201);
    })

    test('[Articles] Update article', async () => {
        const res = await request(app)
            .put('/api/articles/1')
            .send({ title: 'Article modified', content: 'Content test', userId: USER_ID, state: "draft" })
            .set('x-access-token', token);
        expect(res.status).toBe(200);
    })

    test('[Articles] Delete article', async () => {
        const res = await request(app)
            .delete('/api/articles/1')
            .set('x-access-token', token);
        expect(res.status).toBe(204);
    })
})