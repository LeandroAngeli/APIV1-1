'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {});

  carrera.associate = function(models) {
              
      carrera.hasMany(models.materia
      ,{
          as : 'Materia-Relacionada',
          foreignKey: 'id_materia'   
      })
  };
  return carrera;
};