const { favoriteContact } = require("../../models/contacts");

const statusContact = async (req, res, __) => {
  const { contactId } = req.params;
  const body = req.body;
  const updatedContact = await favoriteContact(contactId, body);
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(updatedContact);
};

module.exports = statusContact;