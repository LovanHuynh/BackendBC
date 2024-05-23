'use strict';
const {
    Model
} = require('sequelize');
const { STRING } = require('sequelize/lib/data-types');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeTyle: DataTypes.STRING,
        doctorId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};