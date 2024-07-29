'use strict';
const {
    Model
} = require('sequelize');
const { STRING } = require('sequelize/lib/data-types');
module.exports = (sequelize, DataTypes) => {
    class DoctorInfor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            DoctorInfor.belongsTo(models.User, { foreignKey: 'doctorId' })
            DoctorInfor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'PriceData' })
            DoctorInfor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'PaymentData' })
            DoctorInfor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'ProvinceData' })


            // DoctorInfor.belongsTo(models.User, { foreignKey: 'doctorId', as: 'user' });
            // DoctorInfor.belongsTo(models.Specialty, { foreignKey: 'specialtyId', as: 'specialty' });

        }
    };
    DoctorInfor.init({
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER

    }, {
        sequelize,
        modelName: 'DoctorInfor',

    });
    return DoctorInfor;
};