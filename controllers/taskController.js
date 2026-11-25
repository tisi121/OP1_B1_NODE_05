const Task = require('../models/Task');

const campsModificables = [
  'title',
  'description',
  'cost',
  'hours_estimated',
  'hours_real',
  'image',
  'completed'
];

function completedEsValid(dades) {
  return !Object.prototype.hasOwnProperty.call(dades, 'completed')
    || typeof dades.completed === 'boolean';
}

function respondreError(res, error, missatge) {
  const codi = error.name === 'ValidationError' || error.name === 'CastError'
    ? 400
    : 500;

  return res.status(codi).json({
    error: missatge,
    details: error.message
  });
}

// Crea una tasca nova i assigna la data de finalització si ja està completada.
exports.createTask = (req, res) => {
  const dades = req.body || {};
  if (!completedEsValid(dades)) {
    return res.status(400).json({
      error: 'No s’ha pogut crear la tasca',
      details: 'El camp completed ha de ser booleà'
    });
  }

  const task = new Task({
    title: dades.title,
    description: dades.description,
    cost: dades.cost,
    hours_estimated: dades.hours_estimated,
    hours_real: dades.hours_real,
    image: dades.image,
    completed: dades.completed
  });

  if (task.completed) {
    task.finished_at = new Date();
  }

  task.save()
    .then((savedTask) => res.status(201).json(savedTask))
    .catch((error) => respondreError(res, error, 'No s’ha pogut crear la tasca'));
};

// Obté totes les tasques desades a MongoDB.
exports.getTasks = (req, res) => {
  Task.find()
    .then((tasks) => res.status(200).json(tasks))
    .catch((error) => respondreError(res, error, 'Error obtenint les tasques'));
};

// Cerca una tasca pel seu identificador de MongoDB.
exports.getTaskById = (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ message: 'Tasca no trobada' });
      }

      return res.status(200).json(task);
    })
    .catch((error) => respondreError(res, error, 'Error obtenint la tasca'));
};

// Actualitza només els camps permesos i manté sincronitzada la data de finalització.
exports.updateTask = (req, res) => {
  const dades = req.body || {};
  if (!completedEsValid(dades)) {
    return res.status(400).json({
      error: 'Error actualitzant la tasca',
      details: 'El camp completed ha de ser booleà'
    });
  }

  const actualitzacio = {};

  campsModificables.forEach((camp) => {
    if (Object.prototype.hasOwnProperty.call(dades, camp)) {
      actualitzacio[camp] = dades[camp];
    }
  });

  if (Object.prototype.hasOwnProperty.call(actualitzacio, 'completed')) {
    actualitzacio.finished_at = actualitzacio.completed ? new Date() : null;
  }

  Task.findByIdAndUpdate(req.params.id, actualitzacio, {
    new: true,
    runValidators: true
  })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json({ message: 'Tasca no trobada' });
      }

      return res.status(200).json(updatedTask);
    })
    .catch((error) => respondreError(res, error, 'Error actualitzant la tasca'));
};

// Elimina una tasca pel seu identificador.
exports.deleteTask = (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(404).json({ message: 'Tasca no trobada' });
      }

      return res.status(200).json({
        message: 'Tasca eliminada correctament',
        task: deletedTask
      });
    })
    .catch((error) => respondreError(res, error, 'Error eliminant la tasca'));
};
