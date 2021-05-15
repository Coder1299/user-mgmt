'use strict';

const blogic = require('../lib/blogic');


module.exports = {

    login: function (req, res) {
      login(req, res)
    },
  
    getProfile: function (req, res) {
      getProfile(req, res)
    },

    updateUser: function (req,res){
      updateUser(req,res)
    }

}

let login = async function (req, res) {
  try {
    var resObj = await blogic.users.login(req.body);
    return res.status(201).json(resObj);
  } catch (err) {
    return await processErrorMessage(err, res)
  }
}
  
let getProfile = async function (req, res) {
  try {
      var resObj = await blogic.users.getProfile(req.query);
      return res.status(200).json(resObj);
  } catch (err) {
      return await processErrorMessage(err, res)
  }
}

let updateUser = async function (req, res){
  try {
    var query = { _id: req.params.userId };
    var resObj = await blogic.users.updateUser(query,);
    return res.status(200).json(resObj);
  } catch (err) {
    return await processErrorMessage(err, res)
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
