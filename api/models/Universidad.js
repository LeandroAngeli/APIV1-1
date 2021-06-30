'use strict';
module.exports = (sequelize, DataTypes) => {
  const universidad = sequelize.define('profesor', {
    nombre: DataTypes.STRING,
    id_universidad: DataTypes.INTEGER
  }, {});


  universidad.associate = function(models) {
              
    universidad.hasMany(models.carrera
      ,{
          as : 'Carreras-Relacionadas',
          foreignKey: 'id_carrera'   
      })
  };

  return universidad;
};