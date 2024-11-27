const express = require("express")
const {handleuserSignUp} = require("../controllers/user.controllers")

const router = express.Router();

router.post("/",handleuserSignUp);

module.exports = router;