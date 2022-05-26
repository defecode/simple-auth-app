/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.raw(`CREATE TABLE user_local_info
    (
      user_id VARCHAR(100) NOT NULL,
      name VARCHAR(100) NULL,
      creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id)
    );`)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw(`
    DROP TABLE IF EXISTS user_local_info;
  `)
};
