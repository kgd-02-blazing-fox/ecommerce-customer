"use strict"

const {Favorite} = require("../models")

class FavoriteControllers {
  static async getFavorites(req,res,next) {
    try {
      const favorite = await Favorite.findAll({where:{userId:req.access_id}})
      res.status(200).json(favorite)
    } catch (error) {
      next(error)
    }
  }
  static async postFavorites(req,res,next) {
    try {
      const result = await Favorite.create({
        productId: req.body.productId,
        userId: req.access_id,
      })
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
  static async delFavorites(req,res,next) {
    try {
      const favorite = await Favorite.FindByPk(req.params.id)
      const destroyed = await Favorite.destroy({where:{id:req.params.id}})
      res.status(200).json(favorite)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = FavoriteControllers