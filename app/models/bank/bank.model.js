module.exports = (sequelize, Sequelize) => {
  const Bank = sequelize.define("bank", {
    userId: {
      type: Sequelize.INTEGER
    },
    bankName: {
      type: Sequelize.STRING
    },
    bankType: {
      type: Sequelize.STRING
    }
  });
  return Bank;
};
