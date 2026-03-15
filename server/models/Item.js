const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: "Price must be a valid number" },
        customValidator(value) {
          if (value <= 0) {
            throw new Error("Price must be greater than 0");
          }
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Quantity must be an integer" },
        customValidator(value) {
          if (value < 0) {
            throw new Error("Quantity cannot be negative");
          }
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Category cannot be empty" },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Image URL is required" },
        isValidImageURL(value) {
          if (!value.startsWith("http://") && !value.startsWith("https://")) {
            throw new Error("Image URL must start with http:// or https://");
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Item",
  },
);

module.exports = Item;
