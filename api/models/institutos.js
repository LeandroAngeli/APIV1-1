'use strict';
module.exports = (sequelize, DataTypes) => {
  const instituto = sequelize.define('instituto', {
    nombre: DataTypes.STRING
  }, {});
  
  instituto.associate = function(models) {
    instituto.hasMany(models.carrera, { 
      as:"carrera", 
      primaryKey: "id"
    })
  };

  return instituto;
};