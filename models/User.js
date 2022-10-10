const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class User extends Model {
    //compares attempted login password with the hashed PW
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

User.init(
    {
       id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
       },
       username: {
        type: DataTypes.STRING,
        allowNull: false
       } ,
       password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            len: [8]
        }
       }
    },
    {
        hooks: {
            async beforeCreate(newUserInfo) {
                newUserInfo.password = await bcrypt.hash(newUserInfo.password,10);
                return newUserInfo;
            },
            async beforeUpdate(updatedUserInfo) {
                updatedUserInfo.password = await bcrypt.hash(updatedUserInfo.password,10);
                return updatedUserInfo;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;