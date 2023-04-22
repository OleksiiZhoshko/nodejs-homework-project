const express = require("express");
const addValidator = require("../../midelvars/addValidate");
const putValidate = require("../../midelvars/putValidate");
const { getContacts} = require("../controlers/getContacts");
const { getById } = require("../controlers/getContactById");
const { postContact } = require("../controlers/postContact");
const { deleteContact } = require("../controlers/deleteContact");
const { putContact } = require("../controlers/putContact");
const { addSchema } = require("../../helpers/shema");
const patchValidate = require("../../midelvars/patchValidate")
const statusContact = require("../controlers/favoriteContacts")
const asyncWrapper = require("../../helpers/asyncWrapper")


const router = express.Router();

router.get("/", asyncWrapper(getContacts));

router.get("/:contactId", asyncWrapper(getById));

router.post("/", addValidator(addSchema), asyncWrapper(postContact));

router.delete("/:contactId", asyncWrapper(deleteContact));

router.put("/:contactId", putValidate, asyncWrapper(putContact));

router.patch("/:contactId/favorite", patchValidate, asyncWrapper(statusContact));

module.exports = router;
