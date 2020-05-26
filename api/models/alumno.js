'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    id: DataTypes.INTEGER,
    id_carrera: DataTypes.INTEGER,
    nombre: DataTypes.STRING
  }, {}); 
  
  alumno.associate = function(models) {
    alumno.belongsTo( models.carrera
    ,{
      as : 'Carrera-Relacionada',  
      foreignKey: 'id_carrera'     
    })
  };

  return alumno;
};