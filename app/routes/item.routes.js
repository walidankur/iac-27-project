const { authJwt } = require("../middleware");
const controller = require("../controllers/item.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/item/getexc", controller.getexc);

  app.get("/api/item/getpc", controller.getpc);
  
  app.get("/api/item/gethp", controller.gethp);

  app.get("/api/item/getsw", controller.getsw);
  
  app.get("/api/item/all", controller.getall);

  app.post("/api/item/save",[authJwt.verifyToken], controller.save);

  app.get("/api/item/:id", controller.getbyid);

  app.post("/api/item/delete/:id",[authJwt.verifyToken], controller.delete);

  app.put("/api/item/update/:id",[authJwt.verifyToken], controller.update);

  /*app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );*/
};
