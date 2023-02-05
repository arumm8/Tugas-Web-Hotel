const detail_pemesananModel = require ("../models/index").detail_pemesanan
const query = require('sequelize').Op
//const md5 = require(`md5`)

exports.getAllDetailPemesanan = async (request,response) =>{
    let detail_pemesanan = await detail_pemesananModel.findAll()
        return response.json({
            success : true,
            data : detail_pemesanan,
            message : `All detail_pemesanan have been loaded`
        })
}

exports.findDetailPemesanan = async(request,response) =>{
    
    let id_detail_pemesanan  = request.body.id_detail_pemesanan

    let detail_pemesanan = await detail_pemesananModel.findAll({ 
        where : {
        [query.or] : [
            {id_detail_pemesanan : {[query.substring]: id_detail_pemesanan} }
        ]
        }
    })

    return response.json({
        success : true,
        data : detail_pemesanan,
        message: `All detail_pemesanan have been loaded`
    })
}

exports.addDetailPemesanan = async(request,response) =>{

    let newDetailPemesanan = {
        id_pemesanan: request.body.id_pemesanan, 
        id_kamar: request.body.nama_pemesan,
        tgl_akses: request.body.email
    }

    detail_pemesananModel.create(newDetailPemesanan)
        .then(result => {
        return response.json({
            success: true, 
            data: result,
            message: `New detail_pemesanan has been inserted`
        })
    })

    .catch(error => {
        return response.json({
            success: false, 
            message: error.message
        })
    })
}

exports.updateDetailPemesanan = async(request,response) =>{

    let dataDetailPemesanan = {
        id_pemesanan: request.body.id_pemesanan, 
        id_kamar: request.body.nama_pemesan,
        tgl_akses: request.body.email
    }

    let id_detail_pemesanan = request.params.id

    console.log(id_detail_pemesanan)
    console.log(dataDetailPemesanan)

    detail_pemesananModel.update(dataDetailPemesanan, {where : {id : id_detail_pemesanan}})

    .then (result =>{
        return response.json({
        success: true,
        message: `Data detail_pemesanan has been updated`
        })
    })

    .catch(error =>{
        return response.json({
            success: false, 
            message: error.message
        })
    })
}

exports.deleteDetailPemesanan = (request,response) =>{

    let id_detail_pemesanan = request.params.id

    detail_pemesananModel.destroy({where: {id:id_detail_pemesanan}})

    .then(result => {
        return response.json({
            success: true,
            message: `Data detail_pemesanan has been deleted`
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