'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});
  carrera.associate = function (models) {
    carrera.hasMany(models.materia,
      {
        as: "Carrera-Relacionada",
        primaryKey: "id"
      })

    carrera.hasMany(models.alumno,
      {
        as: "Alumno-Relacionado",
        primaryKey: "id"
      })
    carrera.belongsTo(models.sede,
      {
        as: "Sede-Relacionada",
        foreignKey: "id_sede"
      })
  };
  return carrera;
};