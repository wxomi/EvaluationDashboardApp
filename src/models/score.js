"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Student, {
        foreignKey: "studentId",
        onDelete: "CASCADE",
      });
    }
  }
  Score.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
      },
      IdeationScore: {
        type: DataTypes.INTEGER,
      },
      ExecutionScore: {
        type: DataTypes.INTEGER,
      },
      VivaPatchScore: {
        type: DataTypes.INTEGER,
      },
      total: {
        type: DataTypes.INTEGER,
      },
      Submitted: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Score",
    }
  );
  return Score;
};
