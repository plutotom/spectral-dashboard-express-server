const express = require("express");
const router = express.Router();
const {
  getNotionUsers,
  getNotionDashboard,
} = require("../controllers/notion.js");

router.get("/users", getNotionUsers);
router.get("/dashboard", getNotionDashboard);

module.exports = router;
