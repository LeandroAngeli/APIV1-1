'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING,
    id_instituto: DataTypes.INTEGER
  }, {});
  carrera.associate = function(models) {
    carrera.belongsTo(models.instituto// modelo al que pertenece
      ,{
        as : 'Instituto-Relacionado',  // nombre de mi relacion
        foreignKey: 'id_instituto'     // campo con el que voy a igualar
      })
  }
  
  return carrera;

}