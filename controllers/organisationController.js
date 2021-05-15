'use strict';

const blogic = require('../lib/blogic');


module.exports = {

    createOrganisation: function (req, res) {
        createOrganisation(req, res)
    },

    listOrgUsers: function (req,res){
        listOrgUsers(req,res)
    },

    createRequest: function (req,res){
        createRequest(req,res)
    },

    approveJoinRequest: function(req,res){
        approveJoinRequest(req,res)
    },

    delinkUser: function (req,res){
        delinkUser(req,res)
    }
}


let createOrganisation =  async function (req,res) {
    try {
        var resObj = await blogic.organisations.createOrganisation(req.body);
        return res.status(201).json(resObj);
    } catch (err) {
        return await processErrorMessage(err, res)
    }
}

let listOrgUsers = async function (req,res) {
    try{
        const query = {organisation : req.params.id};
        var resObj = await blogic.organisations.listOrgUsers(query);
        return res.status(201).json(resObj);
    }
    catch(err){
        return await processErrorMessage(err, res);
    }
}

let createRequest = async function (req,res) {
    try{
        var resObj = await blogic.organisations.createRequest(req.body);
        return res.status(201).json(resObj);
    }
    catch(err){
        return await processErrorMessage(err, res);
    }
}

let approveJoinRequest = async function(req,res){
    try{
        const query = {_id:req.params.id}
        var resObj = await blogic.organisations.approveJoinRequest(query);
        return res.status(201).json(resObj);
    }
    catch(err){
        return await processErrorMessage(err, res);
    }
}

let delinkUser = async function(req,res){
    try{
        const query = {_id:req.params.id}
        var resObj = await blogic.organisations.delinkUser(query);
        return res.status(201).json(resObj);
    }
    catch(err){
        return await processErrorMessage(err, res);
    }
}

/**
 *   HANDLE ERROR MESSAGES
 */
async function processErrorMessage(err, res) {
    let resObj = {
      success: false,
      message: err.message
    };
    return res.status(err.code ? err.code : 500).json(resObj);
  }
