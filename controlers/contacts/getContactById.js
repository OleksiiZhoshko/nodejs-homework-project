const { getContactById } = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(contact);
};

module.exports = {getById}