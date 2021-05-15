const e = require('express');
const mongoose = require('mongoose');

//own packages
const mongodb = require('../../config/mongodb');

//models

var User = mongodb.models.User;
var Organisation = mongodb.models.Organisation;
var JoinRequest = mongodb.models.JoinRequest;

let users = {

  createUser: async function (body) {
    try {
      let newUser = new User(body);
      return await newUser.save();
    } catch (err) {
      throw (err)
    }
  },

  getUser: async function (query, select, populate) {
    try {
      let userQuery = User.findOne(query, select);
      if (populate) {
        for (let i = 0; i < populate.length; i++) {
          userQuery.populate(populate[i]);
        }
      }
      return await userQuery.exec();
    } catch (err) {
      throw (err)
    }
  },

  getUsers: async function(query){
    try{
      let usersQuery = User.find(query, {__v:0,createdAt:0,updatedAt:0});
      return await usersQuery.exec();  
    }
    catch(err){
      throw(err)
    }
  },

  updateUser: async function (query, updateObj) {
    try {
      return await User.findOneAndUpdate(query, updateObj, {
        new: true
      }).exec();
    } catch (err) {
      throw (err);
    }
  },
    

}

let organisations = {

  createOrganisation: async function (body) {
    try {
      let newOrganisation = new Organisation(body);
      return await newOrganisation.save();
    } catch (err) {
      throw (err)
    }
  },

  createRequest : async function (body) { 
    try{
      let joinRequest = new JoinRequest(body);
      return await joinRequest.save();
    }
    catch(err){
      throw(err)
    }
  },

  approveJoinRequest : async function (query, updateObj){
    try{
      return await JoinRequest.deleteOne(query).exec();
    }
    catch(err){
      throw(err);
    }
  },

  getJoinRequest: async function (query){
    try{
      let requestQuery = JoinRequest.findOne(query);
      return await requestQuery.exec();
    }
    catch(err){
      throw(err)
    }
  }


}


module.exports = {
  users: users,
  organisations: organisations
}