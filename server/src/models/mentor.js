"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Student, {
        foreignKey: "mentorId",
      });
    }
  }
  Mentor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finalSubmit: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Mentor",
    }
  );
  return Mentor;
};
