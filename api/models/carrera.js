'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING,
    id_instituto: DataTypes.INTEGER
  }, {});

  carrera.associate = function(models) {
    carrera.belongsTo(models.instituto, { 
      as: "Instituto-Relacionado", 
      foreignKey: "id_instituto"
    })
    carrera.hasMany(models.materia, { 
      as:"materia", 
      primaryKey: "id"
    })
    carrera.hasMany(models.alumno, { 
      as:"alumno", 
      primaryKey:"id"
    })
  };

  return carrera;
};