const { DataTypes } = require('sequelize')

const currentYear = new Date().getFullYear();

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isGreaterThan(value) {
          if (parseInt(value) <= parseInt(1991)) {
            throw new Error('Year must be greater than 1991');
          }
        },
        isLessThan(value) {
          if (parseInt(currentYear) <= parseInt(value)) {
            throw new Error(`Year must be less than ${currentYear}`);
          }
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}