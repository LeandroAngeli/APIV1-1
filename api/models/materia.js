'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    id: DataTypes.INTEGER,
    id_carrera: DataTypes.INTEGER,
    nombre: DataTypes.STRING
  }, {}); 
  
  materia.associate = function(models) {
    materia.belongsTo(models.carrera
    ,{
      as : 'Carrera-Relacionada',  
      foreignKey: 'id_carrera'     
    })
  };

  return materia;
};