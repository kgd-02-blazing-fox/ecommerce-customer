"use strict"

const router = require("express").Router()
const FavoriteControllers = require("../controllers/FavoriteControllers.js")
const Access = require("../middlewares/access.js")


router.get("/",Access.authenticate,FavoriteControllers.getFavorites)
router.post("/",Access.authenticate,FavoriteControllers.postFavorites)
router.delete("/:id",Access.authenticate,Access.favoriteAuthorize,FavoriteControllers.delFavorites)


module.exports = router