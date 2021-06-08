const carTypes = [
  {
    name: 'basic',
  },
  {
    name: 'comfort',
  },
  {
    name: 'eco',
  },
  {
    name: 'xl',
  },
  {
    name: 'luxury',
  },
].map((type) => {
  const newType = { ...type };
  newType.created_at = new Date();
  newType.updated_at = new Date();
  return newType;
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */
    await queryInterface.bulkInsert('car_types', carTypes, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
