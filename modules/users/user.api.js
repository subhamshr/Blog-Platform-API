const router = require("express").Router();
const { secureMiddleWare } = require("../../utils/secure");
const { validator } = require("./user.validator");

const userController = require("./user.controller");

router.post(
  "/register",
  validator,
  async (request, response, next) => {
    try {
      if (request.file) {
        request.body.profile = request.file.path;
      }
      await userController.create(request.body);
      response.json({ msg: "register successful" });
    } catch (error) {
      next(error); // sends control flow error to app.js
    }
  }
);

router.post("/login", async (request, response, next) => {
  try {
    const result = await userController.login(request.body);
    response.json({ msg: "User successfully logged in", data: result });
  } catch (error) {
    next(error);
  }
});

router.get("/profile", 
  secureMiddleWare(),
  async (req, res, next) => {
  try {
    const result = await userController.getProfile(req.currentUser);
    res.json({ msg: "User Profile Generated", data: result });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id/profile", 
  secureMiddleWare(),
  async (req, res, next) => {
  try {
    const result = await userController.updateById(req.currentUser, req.body);
    res.json({ msg: "Updated User Profile Successfully", data: result });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await userController.removeById(req.params.id);
    res.json({ msg: "Deleted User", data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;