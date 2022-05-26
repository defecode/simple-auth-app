let utilites = require("../../../../utility")
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
    // Deletes ALL existing entries
    //return knex('user').del()
      //.then(async function () {
        // Inserts seed entries
        let pass = await utilites.encrypt("testing")
        await knex.raw('ALTER TABLE user_api_access AUTO_INCREMENT = 1')
        return knex('user_api_access').insert([
          {username:"testing",password:pass}
        ]);
      //});
  };
  
  