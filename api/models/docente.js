'use strict';
module.exports = (sequelize, DataTypes) => {
  const docente = sequelize.define('docente', {
    nombre: DataTypes.STRING
  }, {});
  docente.associate = function(models) {
    // associations can be defined here
  };
  return docente;
};