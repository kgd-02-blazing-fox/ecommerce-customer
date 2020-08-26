"use strict"

const {Cart} = require("../models")

class CartControllers {
  static async getCarts(req,res,next) {
    try {
      const cart = await Cart.findAll({where:{userId:req.access_id}})
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }
  static async postCarts(req,res,next) {
    try {
      const result = await Cart.create({
        productId: req.body.productId,
        userId: req.access_id,
        amount: req.body.amount,
        history: false
      })
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
  static async putCarts(req,res,next) {
    try {
      const result = await Cart.update({
        amount: req.body.amount,
        history: req.body.history
      },{where:{id:req.params.id}, returning: true})
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
  static async delCarts(req,res,next) {
    try {
      const cart = await Cart.FindByPk(req.params.id)
      const destroyed = await Cart.destroy({where:{id:req.params.id}})
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartControllers