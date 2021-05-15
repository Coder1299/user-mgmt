'use strict'

const storage = require('./storage').mongoDB;
require('dotenv').config();

let users = {
    login: async function (body) {
        try {
          let user = await storage.users.getUser({
            mobile: body.mobile
          });
          if (!user) {
            user = await storage.users.createUser(body);
          }
    
          return {
            success: true,
            result: user
          };
        } catch (err) {
          console.log(err)
          throw (err);
        }
      },
    
      getProfile: async function (query) {
        try {
          let populate = getPopulateFields(query);
          delete query.populate;
          let user = await storage.users.getUser(query, '-__v', populate);
    
          if (!user) {
            throw ({
              code: 404,
              message: `User not found!`
            });
          }
    
          return {
            success: true,
            result: user
          };
        } catch (err) {
          throw (err);
        }
      },

      updateUser: async function (query, body) {
          try{
            let user = await storage.users.updateUser(query, body);
            if(user){
                return{
                    succes: true,
                    result: user
                }
            }
            else{
                throw ({
                    code: 404,
                    message: "User not found."
                  });
            }
          }
          catch(err){
              throw(err)
          }

      }
}

let organisations = {

    createOrganisation: async function(body){
        try{
            let organisation =  await storage.organisations.createOrganisation(body);
            let user = await storage.users.updateUser({_id : body.createdBy},
                {organisation : organisation._id, status : 'ACTIVE'});
            return{
                success: true,
                result: organisation
            }
        }
        catch(err){
            throw(err);
        }
    },

    listOrgUsers : async function(query){
        try{
            let users = await storage.users.getUsers(query);
            return {
                success: true,
                result: users
            }
        }
        catch(err){
            throw(err)
        }
    },

    createRequest : async function(body){
        try{
            let joinRequest = await storage.organisations.createRequest(body);
            return{
                success: true,
                result: joinRequest
            }
        }
        catch(err){
            throw(err)
        }
    },

    approveJoinRequest : async function(query){
        try{
            let request = await storage.organisations.getJoinRequest(query);
            console.log(request);
            let user = await storage.users.updateUser({_id : request.createdBy},
                {organisation : request.organisation, status : 'ACTIVE'});
            request =  await storage.organisations.approveJoinRequest(query);

            return{
                success: true,
                result: 'Approved'
            }
        }
        catch(err){
            throw(err)
        }
    },

    delinkUser :  async function(query){
        try{
            let user = await storage.users.updateUser(query,
                {$unset:{organisation:1, status: 1}});
            return {
                success: true,
                result: user
            }
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