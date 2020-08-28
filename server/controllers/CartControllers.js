"use strict"

const {Cart,Product} = require("../models")
const { Op } = require("sequelize");

class CartControllers {
  static async getCarts(req,res,next) {
    try {
      const cart = await Cart.findAll({where:{UserId:req.access_id}, include: Product, order: [['updatedAt', 'ASC']]})
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }
  static async postCarts(req,res,next) {
    try {
      const cart = await Cart.findOne({where:{
        [Op.and]: [
          { ProductId:req.body.ProductId },
          { UserId:req.access_id }
        ]
      }})
      if (cart && !cart.history) {
        const result = await Cart.increment('amount',{
          by: req.body.amount,
          where:{
            [Op.and]: [
              { ProductId:req.body.ProductId },
              { UserId:req.access_id }
            ]
        }})
        res.status(200).json(result)
      } else {
        const result = await Cart.create({
          ProductId: req.body.ProductId,
          UserId: req.access_id,
          amount: req.body.amount,
          history: false
        })
        res.status(201).json(result)
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async putCarts(req,res,next) {
    try {
      const result = await Cart.update({
        amount: req.body.amount,
      },{where:{id:req.params.id}, returning: true})
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async patchCarts(req,res,next) {
    try {
      const result = await Cart.update({
        history: true,
        purchasedAt: new Date()
      },{where:{UserId:req.access_id}, returning: true})
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async delCarts(req,res,next) {
    try {
        const cart = await Cart.findByPk(req.params.id)
        const destroyed = await Cart.destroy({where:{id:req.params.id}})
        res.status(200).json(cart)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = CartControllers