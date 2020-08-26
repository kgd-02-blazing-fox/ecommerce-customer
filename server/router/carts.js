"use strict"

const router = require("express").Router()
const CartControllers = require("../controllers/CartControllers.js")
const Access = require("../middlewares/access.js")


router.get("/",Access.authenticate,CartControllers.getCarts)
router.post("/",Access.authenticate,CartControllers.postCarts)
router.put("/:id",Access.authenticate,Access.cartAuthorize,CartControllers.putCarts)
router.delete("/:id",Access.authenticate,Access.cartAuthorize,CartControllers.delCarts)


module.exports = router