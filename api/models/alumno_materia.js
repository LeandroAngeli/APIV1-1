'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno_materia = sequelize.define('alumno_materia', {
    id_alumno: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER
  }, {});
  alumno_materia.associate = function(models) {
    // associations can be defined here
    alumno_materia.belongsTo(models.alumno,{as: 'Alumno-Relacionado', foreignKey: 'id_alumno'});
    alumno_materia.belongsTo(models.materia,{as: 'Materia-Relacionada', foreignKey: 'id_materia'});
    
  };
  return alumno_materia;
};