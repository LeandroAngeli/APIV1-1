'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    nombre: DataTypes.STRING,
    id: DataTypes.INTEGER,

  }, {});

  profesor.associate = function(models) {
              
    profesor.belongsTo(models.materia
      ,{
          as : 'Materia-Relacionada',
          foreignKey: 'id_materia'   
      })
  };


  return profesor;
};