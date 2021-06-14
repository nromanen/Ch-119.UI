const cities = [
  {
    name: 'Чернівці',
    basePrice: 40,
    basePriceForKm: 10,
    car_types: [
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
    ].slice(0, 4),
  }
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
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    console.log('queryInterface', queryInterface);
    await queryInterface.bulkInsert('cities', cities, {

    });
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
