const express = require("express");
const user_route = express();
const session = require("express-session");
const nocache = require("nocache");

const config = require("../config/config");

user_route.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

const auth = require("../middleware/auth");

user_route.set("view engine", "ejs");
user_route.set("views", "./views/users");

user_route.use(express.json());
user_route.use(express.urlencoded({ extended: true }));
user_route.use(nocache());

const userController = require("../controllers/userController");

user_route.get("/", auth.isLogout, userController.loginLoad);
user_route.get("/login", auth.isLogout, userController.loginLoad);
user_route.post("/login", userController.verifyLogin);

user_route.get("/home", auth.isLogin, userController.loadHome);

user_route.get("/logout", auth.isLogin, userController.userLogout);

user_route.get("/register", auth.isLogout, userController.loadRegister);
user_route.post("/register", userController.insertUser);

module.exports = user_route;
