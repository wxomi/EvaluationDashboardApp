"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Mentors", [
      {
        name: "John",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "David",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gautam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Girish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tanush",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gokull",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
