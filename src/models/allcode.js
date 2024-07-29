'use strict';
const {
    Model
} = require('sequelize');
const { STRING } = require('sequelize/lib/data-types');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' })

            Allcode.hasMany(models.DoctorInfor, { foreignKey: 'priceId', as: 'PriceData' })
            Allcode.hasMany(models.DoctorInfor, { foreignKey: 'paymentId', as: 'PaymentData' })
            Allcode.hasMany(models.DoctorInfor, { foreignKey: 'provinceId', as: 'ProvinceData' })
            Allcode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'timeTypeDataBook' })
            Allcode.hasMany(models.Booking, { foreignKey: 'statusId', as: 'statusData' })

        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};