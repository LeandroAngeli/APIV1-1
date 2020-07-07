'use strict';
module.exports = (sequelize, DataTypes) => {
  const docentes = sequelize.define('docentes', {
    nombre: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {});
  docentes.associate = function(models) {
    docentes.belongsTo(models.materia,
      {
        as: 'Materia-Relacionada',
        foreignKey: 'id_materia'
      })
  };
  return docentes;
};