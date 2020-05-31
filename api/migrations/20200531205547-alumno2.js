'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
     'alumnos',
     'id_carrera',
     {
       type: Sequelize.INTEGER
    }
    )

  },
};
