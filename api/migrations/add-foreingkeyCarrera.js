'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('carreras', 'id_instituto', Sequelize.INTEGER)
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('carreras');
    }
};