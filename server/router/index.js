"use strict"

const router = require("express").Router()
const products = require("./products.js")
const favorites = require("./favorites.js")
const carts = require("./carts.js")
const UserControllers = require("../controllers/UserControllers.js")



router.post("/login",UserControllers.login)
router.post("/register",UserControllers.register)
router.use("/products",products)
router.use("/favorites",favorites)
router.use("/carts",carts)

module.exports = router