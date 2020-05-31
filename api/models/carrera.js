'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});
  carrera.associate = function(models) {
    carrera.belongsTo(models.materia, models.alumno,
      { 
        as: "Carrera-Relacionada", 
        primaryKey: "id"
      })
   };
  
  return carrera;
};