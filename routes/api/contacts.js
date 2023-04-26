const express = require("express");
const addValidator = require("../../midelvars/addValidate");
const putValidate = require("../../midelvars/putValidate");
const { getContacts} = require("../../controlers/contacts/getContacts");
const { getById } = require("../../controlers/contacts/getContactById");
const { postContact } = require("../../controlers/contacts/postContact");
const { deleteContact } = require("../../controlers/contacts/deleteContact");
const { putContact } = require("../../controlers/contacts/putContact");
const { addSchema } = require("../../helpers/shema");
const patchValidate = require("../../midelvars/patchValidate")
const statusContact = require("../../controlers/contacts/favoriteContacts")
const asyncWrapper = require("../../helpers/asyncWrapper")
const authenticate = require("../../midelvars/authenticate");


const router = express.Router();

router.get("/",authenticate, asyncWrapper(getContacts));

router.get("/:contactId", authenticate, asyncWrapper(getById));

router.post("/",authenticate, addValidator(addSchema), asyncWrapper(postContact));

router.delete("/:contactId", authenticate, asyncWrapper(deleteContact));

router.put("/:contactId", authenticate, putValidate, asyncWrapper(putContact));

router.patch("/:contactId/favorite",authenticate, patchValidate, asyncWrapper(statusContact));

module.exports = router;
