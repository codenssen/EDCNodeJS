const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const usersService = require("../api/users/users.service");
const NotFoundError = require("../errors/not-found");

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];
    if (!accessToken) {
      throw "Access token not found";
    }
    const decodedToken = jwt.verify(accessToken, config.secretJwtToken);

    // 5. Modifiez le middleware d’authentification afin de faire récupérer toutes les informations d’un utilisateur et les faire passer dans « req » (et pas seulement l’id de l’utilisateur)

    const user = await usersService.get(decodedToken.userId);
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};
