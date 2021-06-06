const extraServices = [
  {
    name: 'Air conditioning',
  },
  {
    name: 'English speaking driver',
  },
  {
    name: 'Silent driver',
  },
  {
    name: 'Baby chair',
  },
].map((type) => {
  const newType = { ...type };
  newType.createdAt = new Date();
  newType.updatedAt = new Date();
  return newType;
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('ExtraServices', extraServices, {});
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
