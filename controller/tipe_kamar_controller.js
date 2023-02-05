const tipeKamarModel = require ("../models/index").tipe_kamar
const query = require('sequelize').Op
const { request, response } = require("express")
const path  = require("path")
const upload = require(`./upload-foto-kamar`).single(`foto_kamar`)
const fs = require(`fs`)

exports.getAllTipeKamar = async (request,response) =>{
    let tipe_kamar = await tipeKamarModel.findAll()
        return response.json({
            success : true,
            data : tipe_kamar,
            message : `All tipe kamar been loaded`
        })
}

exports.findTipeKamar = async(request,response) =>{
    
    let nama_tipe_kamar = request.body.nama_tipe_kamar

    let tipe_kamar = await tipeKamarModel.findAll({ 
        where : {
        [query.or] : [
            {nama_tipe_kamar : {[query.substring]: nama_tipe_kamar} }
        ]
        }
    })

    return response.json({
        success : true,
        data : tipe_kamar,
        message: `All tipe kamar have been loaded`
    })
}

exports.addTipeKamar = async(request,response) =>{
    upload(request, response, async error => {
        if (error) {
            console.log("kayaknya err")
            return response.json({ message: error })
        }
        
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`
        })
    }
    let newTipeKamar = {
        nama_tipe_kamar: request.body.nama_tipe_kamar, 
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.file.filename
    }
    console.log(newTipeKamar)

    tipeKamarModel.create(newTipeKamar)
        .then(result => {
        return response.json({
            success: true, 
            data: result,
            message: `New tipe kamar has been inserted`
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

exports.updateTipeKamar = async(request,response) =>{

    let dataTipeKamar = {
        nama_tipe_kamar: request.body.nama_tipe_kamar, 
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.body.foto
    }

    let id_tipe_kamar = request.params.id_tipe_kamar

    console.log(id_tipe_kamar)
    console.log(dataTipeKamar)

    tipeKamarModel.update(dataTipeKamar, {where : {id_tipe_kamar : id_tipe_kamar}})

    .then (result =>{

        return response.json({
        success: true,
        message: `Data tipe kamar has been updated`
        })
    })

    .catch(error =>{

        return response.json({
            success: false, 
            message: error.message
        })
    })
}

exports.deleteTipeKamar = (request,response) =>{

    let id_tipe_kamar = request.params.id_tipe_kamar

    tipeKamarModel.destroy({where: {id_tipe_kamar:id_tipe_kamar}})

    .then(result => {
        return response.json({
            success: true,
            message: `Data tipe kamar has been deleted`
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