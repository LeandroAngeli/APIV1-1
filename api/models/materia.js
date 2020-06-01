'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {});
  materia.associate = function(models) {
    // associations can be defined here
    materia.belongsTo(models.carrera
      ,{
        as: 'Carrera-Relacionada',
        foreignKey: 'id_carrera'
      })
  };
  return materia;
};