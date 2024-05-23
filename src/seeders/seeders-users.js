'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'huynhsth@gmail.com',
        password: '123456',
        firstName: 'Mai',
        lastName: 'Hoa',
        address: 'Ninh Binh',
        phonenumber: "033765217",
        gender: 0,
        image: "chua co gi",
        roleId: 'R1',
        positionId: 'cai gi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
