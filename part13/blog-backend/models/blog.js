const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

const currentYear = new Date().getFullYear()

class Blog extends Model {}

Blog.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year: {
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
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'blog'
  })

module.exports = Blog