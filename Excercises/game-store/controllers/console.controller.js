//Models
const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');
//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;

  const newConsole = await Console.create({ name, company });

  res.status(201).json({
    status: 'succes',
    data: { newConsole },
  });
});

const getAllConsoles = catchAsync(async (req, res, next) => {
  const consles = await Console.findAll({
    where: { status: 'active' },
    include: { model: Game },
  });

  res.status(200).json({
    status: 'succes',
    data: { consles },
  });
});

const updateConsole = catchAsync(async (req, res, next) => {
  const { console } = req;
  const { name } = req.body;
  await console.update({ name });

  res.status(200).json({
    status: 'succes',
    data: { console },
  });
});

const deleteConsole = catchAsync(async (req, res, next) => {
  const { console } = req;
  await console.update({ status: 'deleted' });

  res.status(204).json({
    status: 'succes',
  });
});

module.exports = {
  createConsole,
  getAllConsoles,
  updateConsole,
  deleteConsole,
};
