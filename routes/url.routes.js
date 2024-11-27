const express = require("express")
const router = express.Router();
const {handleGenerateNewShortId,handleGetAnalytics} = require("../controllers/url.controllers")

router.post("/",handleGenerateNewShortId);

router.get("/analytics/:shortdId",handleGetAnalytics)

module.exports = router;