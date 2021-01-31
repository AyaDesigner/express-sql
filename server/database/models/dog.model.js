module.exports = (Sequelize, connector) => {
    const Dog = connector.define('dog', {
      name: Sequelize.STRING,
      arrivalDate: Sequelize.DATE,
      castrated: Sequelize.BOOLEAN,
      age: Sequelize.INTEGER,
    })
    return Dog;
  }