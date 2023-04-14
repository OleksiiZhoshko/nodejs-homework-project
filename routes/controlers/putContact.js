const { updateContact } = require("../../models/contacts");

const putContact = async (req, res, __) => {
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
}

module.exports = {putContact}