"use strict"

const app = require("../app.js")
const request = require("supertest")
const {User} = require("../models")

describe("Customer", ()=>{

    beforeAll(done=>{
          User.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456',
            role: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        )
        .then(res=>{return User.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '',
            role: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        })})
        .then(res=>{done()})
        .catch(err=>console.log(err))
    })

    afterAll(done=>{
        User.destroy({
          truncate:true,
          cascade:true,
        })
        .then(res=>done())
        .catch(err=>console.log(err))
    })

    test("customer login success",(done)=>{
        request(app)
        .post("/login")
        .send({
            email: 'johndoe@mail.com',
            password: '123456'
        })
        .end((err,res)=>{
            console.log(res.body)
            if (err) done(err)
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("access_token")
            done()
        })
    })

    test("customer login failed - wrong email", done=>{
        request(app)
        .post("/login")
        .send({
            email: "johndairy@ecommerce.com",
            password: "123456"
        })
        .end((err,res)=>{
            if (err) done(err)
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Username/password didn't match")
            done()
        })
    })

    test("customer login failed - wrong password", done=>{
        request(app)
        .post("/login")
        .send({
            email: "johndoe@mail.com",
            password: "111111"
        })
        .end((err,res)=>{
            if (err) done(err)
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Username/password didn't match")
            done()
        })
    })

    test("customer login failed - login attempt with previous Social Login", done=>{
        request(app)
        .post("/login")
        .send({
            email: "johndoe@gmail.com",
            password: "123456"
        })
        .end((err,res)=>{
            if (err) done(err)
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Did you login via Social Login previously?")
            done()
        })
    })

    test("customer login failed - empty email", done=>{
        request(app)
        .post("/login")
        .send({
            email:"",
            password:"1234"
        })
        .end((err,res)=>{
            if (err) done(err)
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please fill in the email")
            done()
        })
    })

    test("customer login failed - empty password", done=>{
        request(app)
        .post("/login")
        .send({
            email:"johndoe@mail.com",
            password:""
        })
        .end((err,res)=>{
            if (err) done(err)
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("message", "Please fill in the password")
            done()
        })
    })
})