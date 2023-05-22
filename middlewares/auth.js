const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const usersService = require("../api/users/users.service");
const NotFoundError = require("../errors/not-found");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user = decoded;
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);

    // 5. Modifiez le middleware d’authentification afin de faire récupérer toutes les informations d’un utilisateur et les faire passer dans « req » (et pas seulement l’id de l’utilisateur)
    try {
      const user = await usersService.get(decoded.userId);
      if (!user) {
        throw new NotFoundError;
      }
      req.user = user;
      
    }
    catch(err) {
      next(err)
    }
        
    next();

  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
