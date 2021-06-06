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
  newType.createdAt = new Date();
  newType.updatedAt = new Date();
  return newType;
});

console.log(carTypes);
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */
    await queryInterface.bulkInsert('CarTypes', carTypes, {});
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
