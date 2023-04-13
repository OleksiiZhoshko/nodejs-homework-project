const { removeContact } = require("../../models/contacts");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToRemove = await removeContact(contactId);
  if (!contactToRemove) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact deleted" });
}

module.exports = {deleteContact}