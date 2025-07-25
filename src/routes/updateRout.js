const express = require("express");
const router = express.Router();
const updateController = require("../controllers/updateController");

router.get("/long-polling", updateController.longPool);
router.post("/update", updateController.update);

module.exports = router;
