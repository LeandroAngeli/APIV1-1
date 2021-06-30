'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    id_materia: DataTypes.INTEGER,
    id_carrera: DataTypes.INTEGER
  }, {});


  materia.associate = function(models) {
    materia.belongsTo(models.carrera,{
      as : 'Carrera-Relacionada',
      foreignKey: 'id_carrera'
    })
  };

  materia.associate = function(models) {
    materia.hasMany(models.alumno,{
      as : 'Alumno_Relacionado',
      foreignKey: 'id_alumno'
    })
  };


  
  return materia;                         
};