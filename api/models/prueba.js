'use strict';
module.exports = (sequelize, DataTypes) => {
  const prueba = sequelize.define('prueba', {
    nombre: DataTypes.STRING,
    edad: DataTypes.INTEGER
  }, {});
  prueba.associate = function(models) {
    // associations can be defined here
  };
  return prueba;
};