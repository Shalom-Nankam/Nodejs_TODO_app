const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userService = require("../users/user.service");
const taskService = require("../tasks/task.service");
const logger = require("../logger/logger");

require("dotenv").config();

const router = express.Router();

router.use(cookieParser());

router.get("/index", (req, res) => {
  res.render("index", { user: res.locals.user || null, error: null });
});

router.get("/signup", (req, res) => {
  res.render("signup", { user: res.locals.user || null, error: null });
});

router.post("/signup", async (req, res) => {
  const newUser = await userService.CreateUser(req.body);
  if (newUser.code === 201) {
    res.redirect("/views/index");
    // res.render("index", { user: res.locals.user || null });
  } else {
    res.render("signup", { error: newUser.message });
  }
});

router.post("/index", async (req, res) => {
  const response = await userService.Login({
    email: req.body.email,
    password: req.body.password,
  });

  if (response.code === 200) {
    res.cookie("jwt", response.token);
    res.locals.user = response.user;

    res.redirect("/views/home");
  } else {
    res.render("index", { error: response.message });
  }
});

router.use(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
      res.locals.user = decodedToken;
      next();
    } catch (error) {
      res.redirect("index");
    }
  } else {
    res.redirect("index");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("index");
});

router.get("/home", async (req, res) => {
  const userInfo = await userService.getUser(res.locals.user);
  const allTasks = await taskService.GetAllTasks(userInfo.data._id);
  res.render("home", {
    user: userInfo.data,
    tasks: allTasks.data,
    error: null,
  });
});

router.get("/tasks/create", (req, res) => {
  res.render("createtask", { user: res.locals.user, error: null });
});

router.post("/tasks/create", async (req, res) => {
  const response = await taskService.CreateTask(req.body);
  if (response.code === 201) {
    res.redirect("/views/home");
  } else {
    res.render("createtask", {
      user: res.locals.user,
      error: response.message,
    });
  }
});

router.post("/tasks/update/:id", async (req, res) => {
  const response = await taskService.ChangeStatus(req.params.id);

  if (response.code === 201) {
    res.redirect("/views/home");
  } else {
    res.render("home", { user: userInfo.data, error: response.message });
  }
});

router.post("/tasks/delete/:id", async (req, res) => {
  const response = await taskService.DeleteTask(req.params.id);

  if (response.code === 201) {
    res.redirect("/views/home");
  } else {
    res.render("home", { user: userInfo.data, error: response.message });
  }
});

module.exports = router;
