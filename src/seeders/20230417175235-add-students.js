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
    queryInterface.bulkInsert("Students", [
      {
        name: "Anshul",
        email: "sainianshul4987@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sneha",
        email: "sneha@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shakshi",
        email: "shakshi@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Somansh",
        email: "somansh@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gurparas",
        email: "gurparas@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Anubhav",
        email: "anubhav@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gaurav",
        email: "gaurav@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ujjwal",
        email: "ujjwal@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bhoomika",
        email: "bhoomika@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bhavya",
        email: "bhavya@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ayushee",
        email: "ayushee@gmail.com",

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
