const express = require("express");
const addValidator = require("../../midelvars/addValidate");
const putValidate = require("../../midelvars/putValidate");
const { getContacts} = require("../controlers/getContacts");
const { getById } = require("../controlers/getContactById");
const { postContact } = require("../controlers/postContact");
const { deleteContact } = require("../controlers/deleteContact");
const { putContact } = require("../controlers/putContact");
const { addSchema } = require("../../helpers/shema");


const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getById);

router.post("/", addValidator(addSchema), postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putValidate, putContact);

module.exports = router;
