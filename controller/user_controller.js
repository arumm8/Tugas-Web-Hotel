const { request, response } = require("express")
const userModel = require("../models/index").user
const query = require('sequelize').Op
const path  = require("path")
const upload = require(`./upload-foto-user`).single(`foto_user`)
const fs = require(`fs`) //buat file
const md5 = require(`md5`)
const { error } = require("console")

const login = async (request,response) => {
    try {
        const params = {
            email: request.body.email,
            password: md5(req.body.password),
        };

        const findUser = await user.findOne({ where: params});
        if (findUser == null) {
            return response.status(404).json({
                message: "email or password doesn't match",
                err: error,
            });
        }
        console.log(findUser)
        //generate jwt token
        let tokenPayLoad = {
            id_user: findUser.id_costumer,
            email: findUser.email,
            role: findUser.role,
        };
        tokenPayLoad = JSON.stringify(tokenPayLoad);
        let token = await jsonwebtoken.sign(tokenPayLoad,SECRET_KEY);

        return response.status(200).json({
            message: "Success login",
            data:{
                token: token,
                id_user: findUser.id_user,
                email: findUser.email,
                role: findUser.role,
            },
        });
    } catch (error){
        console.log(error);
        return response.status(500).json({
            message: "Internal error",
            err: error,
        });
    }
};

exports.getAllUser = async (request,response) => {
    let user = await userModel.findAll()
        return response.json({
            success : true,
            data : user,
            message : 'All users have been loaded'
        })
}

exports.findUser = async(request,response) =>{
    let nama_user = request.body.nama_user
    let user = await userModel.findAll({
        where : {
            [query.or] : [
                {nama_user : {[query.substring]: nama_user} }
            ]
        }
    })
    return response.json({
        success : true,
        data : user,
        message: `All user have been loaded`
    })
}

exports.addUser = (request,response) =>{
    upload(request, response, async error => {
        if (error) {
            console.log(error)
            return response.json({ message: error })
        }
        
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`
        })
    }

    let newUser = {
        nama_user: request.body.nama_user,
        foto: request.file.filename,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role
    }
    console.log(newUser.nama_user)

    userModel.create(newUser)
        .then(result => {
        return response.json({
            success: true, 
            data: result,
            message: `New user has been inserted`
         })
    })
    .catch(error => {
        return response.json({
            success: false, 
            message: error.message
        })
    })
})
}

exports.updateUser = async(request,response) =>{
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`
        })
    }

    let dataUser = {
        nama_user: request.body.nama_user,
        foto: request.file.filename,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role
    }

    let id_user = request.params.id_user

    console.log(id_user)
    console.log(dataUser)

    userModel.update(dataUser, {where : {id_user : id_user }})

    .then (result => {
        return response.json({
            success: true,
            message: `Data user has been updated`
        })
    })

    .catch(error =>{
        return response.json({
            success: false, 
            message: error.message
        })
    })
})
}

exports.deleteUser = (request,response) =>{
    let id_user = request.params.id_user

    userModel.destroy({where : {id_user : id_user}})

    .then(result => {
        return response.json({
            success: true,
            message: `Data user has been deleted`
        })
    })

    .catch(error => {
        /** if update's process fail */ 
        return response.json({
            success: false,
            message: error.message
        })
    })
}