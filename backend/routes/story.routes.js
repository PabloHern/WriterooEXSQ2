module.exports = app => {
  const story = require("../controllers/story.controller");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  // Create a new Story
  // DECOMMENT:
  router.post("/", upload.single('file'), story.create);
  router.post("/", story.create);

  // Retrieve all Story
  router.get("/", story.findAll);

  // Retrieve a single Story with id
  router.get("/:id", story.findOne);

  // Update a Story with id
  router.put("/:id", story.update);

  // Delete a Story with id
  router.delete("/:id", story.delete);

  app.use("/api/stories", router);
}