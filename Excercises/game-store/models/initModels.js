// Models
const { User } = require('./user.model');
const { Review } = require('../models/review.model');
const { Game } = require('../models/game.model');
const { Console } = require('../models/console.model');

const initModels = () => {
  // 1 User <----> M Review
  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User);

  // 1  Game <---> M Review
  Game.hasMany(Review, { foreignKey: 'gameId' });
  Review.belongsTo(Game);

  // M Game <---> M Conscole
  Game.belongsToMany(Console, {
    through: 'gameInConsole',
    foreignKey: 'gameId',
  });
  Console.belongsToMany(Game, {
    through: 'gameInConsole',
    foreignKey: 'consoleId',
  });
};

module.exports = { initModels };
