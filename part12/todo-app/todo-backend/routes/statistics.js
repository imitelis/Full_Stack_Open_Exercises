const express = require('express');
const { getAsync } = require('../redis');
const router = express.Router();

/* GET added todos. */
router.get('/', async (_, res) => {
  let added_todos = await getAsync("added_todos")
  res.send({"added_todos": Number(added_todos)});
});

module.exports = router;