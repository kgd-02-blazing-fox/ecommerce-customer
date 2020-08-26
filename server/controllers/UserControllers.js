"use strict"

const { User } = require("../models/index.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { OAuth2Client } = require("google-auth-library")

class UserControllers {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body
      if (!email) throw new Error("Please fill in the email")
      if (!password) throw new Error("Please fill in the password")
      const user = await User.findOne({ where: { email } })
      if (!user) {
        throw new Error("Wrong email/password combination")
      } else {
        if (!user.password) {
          throw new Error("Did you login via Social Login previously?")
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
              "access_token": jwt.sign({
                name: user.name,
                email: user.email,
                role: user.role
              }, process.env.JWT_SECRET)
            })
          } else {
            throw new Error("Wrong email/password combination")
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }
  static async Glogin(req, res, next) {
    try {
      const gClient = new OAuth2Client(process.env.GOOGLE_ID)
      const ticket = await gClient.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_ID
      })
      const credential = ticket.getPayload()
      const user = await User.findOne({ where: { email: credential.email } })
      if (user) {
        let access_token = jwt.sign({
          name: user.name,
          email: user.email,
          role: user.role
        }, process.env.JWT_SECRET)
        res.status(200).json({ access_token })
      } else {
        const userCreate = await User.create({
          name: credential.email.substring(0, credential.email.lastIndexOf("@")),
          email: credential.email,
          role: ''
        })
        let access_token = jwt.sign(userCreate.dataValues, process.env.JWT_SECRET)
        res.status(201).json({ access_token })
      }
    } catch (error) {
      next(error)
    }
  }
  static async register(req,res,next) {
    try {
      const {name,email,password} = req.body
      const Glogged = await User.findOne({where:{email}})
      if (Glogged) {
        if (Glogged.password === '') {
          throw new Error("Did you login via Social Login previously?")
        }
      }
      if (!name) throw new Error("Please fill in your name")
      if (!email) throw new Error("Please fill in the email")
      if (!password) throw new Error("Please fill in the password")
      const result = await User.create({
        name,
        email,
        password,
        role: ''
      })
      res.status(201).json({
        "access_token": jwt.sign({
          name: result.name,
          email: result.email,
          role: result.role
        }, process.env.JWT_SECRET)
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserControllers