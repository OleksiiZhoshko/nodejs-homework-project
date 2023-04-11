const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const addValidator = require("../../midelvars/addValidate");
const { addSchema, changeSchema } = require("../../helpers/shema");
const putValidate = require("../../midelvars/putValidate");


const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
  next();
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    res.status(200).json(contact);
    next();
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
});

router.post("/", addValidator(addSchema), async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json(contact);
    next();
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactToRemove = await removeContact(contactId);
  if (!contactToRemove) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", putValidate(changeSchema), async (req, res, next) => {
    const { contactId } = req.params;
  const body = req.body;
  if (!Object.values(body).length) {
    return res.status(400).json({ message: "missing fields" });
  }
  const changeContact = await updateContact(contactId, body);
  if (!changeContact) {
    return res.status(404).json({ message: "Not found" });
  }
	res.status(200).json(changeContact);
	next();
});

module.exports = router;
