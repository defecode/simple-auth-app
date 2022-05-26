/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.raw(`CREATE TABLE user_api_access
    (
      id int AUTO_INCREMENT,
      username VARCHAR(100) NOT NULL,
      password VARCHAR(255) NOT NULL,
      creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    );`)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw(`
    DROP TABLE IF EXISTS user_api_access;
  `)
};
