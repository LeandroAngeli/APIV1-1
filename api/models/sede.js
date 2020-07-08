'use strict';
module.exports = (sequelize, DataTypes) => {
  const sede = sequelize.define('sede', {
    nombre: DataTypes.STRING
  }, {});
  sede.associate = function (models) {
    sede.hasMany(models.carrera,
      {
        as: "Sede-Relacionada",
        primaryKey: "id"
      })
  };
  return sede;
};