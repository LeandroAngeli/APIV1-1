'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    id_profesor: DataTypes.INTEGER,
    id_carrera: DataTypes.INTEGER
  }, {});
  materia.associate = function(models) {
    materia.belongsTo(models.profesor// modelo al que pertenece
      ,{
        as : 'Profesor-Relacionado',  // nombre de mi relacion
        foreignKey: 'id_profesor'     // campo con el que voy a igualar
      });
      materia.belongsTo(models.carrera,
        {
          as: 'Carrera-Relacionada',
          foreignKey: 'id_carrera'
        })
  };
  return materia;
};

