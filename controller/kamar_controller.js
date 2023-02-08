const kamarModel = require ("../models/index").kamar
const tipekamarModel = require ("../models/index").tipe_kamar
const query = require('sequelize').Op

exports.getAllKamar = async (request,response) =>{
    let kamar = await kamarModel.findAll()
        return response.json({
            success : true,
            data : kamar,
            message : `All kamars been loaded`
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

    try{
        let newKamar = {
            nomor_kamar: request.body.nomor_kamar, 
            id_tipe_kamar : request.body.id_tipe_kamar
        }

        console.log(newKamar.id_tipe_kamar)
        tipekamar = await tipekamarModel.findOne({
            where:{
                [query.or]:[
                    {id_tipe_kamar : {[query.substring]: newKamar.id_tipe_kamar}}
                ]
            }
        })
        console.log(tipekamar.id_tipe_kamar)
        if(newKamar.id_tipe_kamar == tipekamar.id_tipe_kamar){
            //menyamakan hasil inputan dengan yg ada di database
                kamarModel.create(newKamar)
                .then(result => {
                return response.json({
                    success: true, 
                    data: result,
                    message: `New kamar has been inserted`
                })
            })
        }
    }catch(err){
        return response.json({
            success: false, 
            data: err,
            message: `id tipe kamar tidak ada`
        })
    }
}

exports.updateKamar = async(request,response) =>{

    let dataKamar = {
        nomor_kamar: request.body.nomor_kamar, 
        // id_tipe_kamar : request.body.id_tipe_kamar
    }

    let id = request.params.id

    console.log(id)
    console.log(dataKamar)

    kamarModel.update(dataKamar, {where : {id : id}})

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

    let id = request.params.id

    kamarModel.destroy({where: {id:id}})

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