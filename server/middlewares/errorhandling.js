"use strict"

function errorHandling(err,req,res,next) {
    if (err.name !== "Error") {
        if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
            if (err.errors[0].message === "name must be unique") {
                res.status(400).json({"message":"Product item already registered"})
            } else if (err.errors[0].message === "email must be unique") {
                res.status(400).json({"message":"Email already registered"})
            }
            else res.status(400).json({"message":err.errors[0].message})
        } else {
            res.status(500).json({"message":"Internal error"})
        }
    } else {
        switch (err.message) {
            case "Wrong email/password combination":
                res.status(400).json({"message":"Username/password didn't match"})
                break;
            case "Did you login via Social Login previously?":
                res.status(400).json({"message":"Did you login via Social Login previously?"})
                break;
            case "Please fill in the email":
                res.status(400).json({"message":"Please fill in the email"})
                break;
            case "Please fill in your name":
                res.status(400).json({"message":"Please fill in your name"})
                break;
            case "Please fill in the password":
                res.status(400).json({"message":"Please fill in the password"})
                break;
            case "File not found":
                res.status(404).json({"message":"File not found"})
                break;
            case "Invalid token":
                res.status(401).json({"message":"Access denied"})
                break;
            case "Unauthorized access":
                res.status(401).json({"message":"Unauthorized access"})
                break;
            default:
                res.status(500).json({"message":"Internal error"})
                break;
        }
    }

}

module.exports = {errorHandling}