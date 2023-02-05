const kamarModel = require ("../models/index").kamar
const query = require('sequelize').Op

exports.getAllKamar = async (request,response) =>{
    let kamar = await kamarModel.findAll()
        return response.json({
            success : true,
            data : kamar,
            message : `All Admins kamar been loaded`
        })
}

exports.findKamar = async(request,response) =>{
    
    let nomor_kamar = request.body.nomor_kamar

    let kamar = await kamarModel.findAll({ 
        where : {
        [query.or] : [
            {nomor_kamar : {[query.substring]: nomor_kamar} }
        ]
        }
    })

    return response.json({
        success : true,
        data : kamar,
        message: `All kamar have been loaded`
    })
}

exports.addKamar = async(request,response) =>{

    let newKamar = {
        nomor_kamar: request.body.nomor_kamar, 
        id_tipe_kamar : request.body.id_tipe_kamar
    }

    kamarModel.create(newKamar)
        .then(result => {
        return response.json({
            success: true, 
            data: result,
            message: `New kamar has been inserted`
        })
    })

    .catch(error => {
        return response.json({
            success: false, 
            message: error.message
        })
    })
}

exports.updateKamar = async(request,response) =>{

    let dataKamar = {
        nomor_kamar: request.body.nomor_kamar, 
        id_tipe_kamar : request.body.id_tipe_kamar
    }

    let id_kamar = request.params.id

    console.log(id_kamar)
    console.log(dataKamar)

    kamarModel.update(dataKamar, {where : {id : id_kamar}})

    .then (result =>{

        return response.json({
        success: true,
        message: `Data kamar has been updated`
        })
    })

    .catch(error =>{

        return response.json({
            success: false, 
            message: error.message
        })
    })
}

exports.deleteKamar = (request,response) =>{

    let id_kamar = request.params.id

    kamarModel.destroy({where: {id:id_kamar}})

    .then(result => {
        return response.json({
            success: true,
            message: `Data kamar has been deleted`
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