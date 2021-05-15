'use strict'

const storage = require('./storage').mongoDB;
require('dotenv').config();
const logger = require('../utils/winston-logger');

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
            logger.error(`Error in login function ${err}`);
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
            logger.error(`Error in getProfile function ${err}`)
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
            logger.error(`Error in updatedUser function ${err}`)
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
            logger.error(`Error in createOrganisation function ${err}`)
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
            logger.error(`Error in listOrgUsers function ${err}`)
            throw(err)
        }
    },

    createRequest : async function(body){
        try{
            let user = await storage.users.updateUser({_id : body.user},
                {organisation : body.organisation, status : 'PENDING'});
            return{
                success: true,
                result: user
            }
        }
        catch(err){
            logger.error(`Error in createRequest function ${err}`)
            throw(err)
        }
    },

    approveJoinRequest : async function(query){
        try{
            let user = await storage.users.updateUser(query,
                {status : 'ACTIVE'});
            return{
                success: true,
                result: user
            }
        }
        catch(err){
            logger.error(`Error in approveJoinRequest function ${err}`)
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
            logger.error(`Error in delink function ${err}`)
            throw(err)
        }
    }

}

module.exports = {
    users: users,
    organisations: organisations
  }