const db = require("../models");
const Story = db.story;
const Op = db.Sequelize.Op;

// Create and Save a new Story
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.content) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Story
  const story = {
    title: req.body.title,
    content: req.body.content,
    filename: req.file ? req.file.filename : ""
  }

  // Save Story in the database
  Story.create(story).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the story"
    })
  });
};

// Retrieve all Stories from the database.
exports.findAll = (req, res) => {
  Story.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Storys"
    })
  })
};

// Find a single Story with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Story.findByPk(id).then(data => {
    if (data) {
      res.send(data);
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Storys"
    })
  })
}

// Update a Story by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  const story = {
    title: req.body.title,
    content: req.body.content,
    filename: req.file ? req.file.filename : ""
  }
  Story.update(story, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Story with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Story.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
