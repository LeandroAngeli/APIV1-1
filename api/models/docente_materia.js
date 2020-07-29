'use strict';
module.exports = (sequelize, DataTypes) => {
  const docente_materia = sequelize.define('docente_materia', {
    id_docente: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER
  }, {});
  docente_materia.associate = function(models) {
    // associations can be defined here
    docente_materia.belongsTo(models.docente,{as: 'Docente-Relacionado', foreignKey: 'id_docente'});
    docente_materia.belongsTo(models.materia,{as: 'Materia-Relacionada', foreignKey: 'id_materia'});
  };
  return docente_materia;
};