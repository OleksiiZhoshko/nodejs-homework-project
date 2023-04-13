const { listContacts } = require("../../models/contacts");


const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
  next();
}

// const getContactsById =  async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const contact = await getContactById(contactId);
//     res.status(200).json(contact);
//     next();
//   } catch (error) {
//     return res.status(404).json({ message: "Not found" });
//   }
// }

module.exports = {
    getContacts
}

