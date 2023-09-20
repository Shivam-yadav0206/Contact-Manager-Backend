const express = require("express");
const router = express.Router();    
const {getContacts,createContact,getContact,updateContact,delContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getContacts);
router.route("/").post(createContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(delContact);
router.route("/:id").get(getContact);


//Can also be written like this
// router.route("/").get(getContacts).post(createContact);
// router.route("/:id").put(updateContact).delete(delContact).get(getContact);

module.exports = router; 