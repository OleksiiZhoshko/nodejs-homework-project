const Contact = require("../database/shemaModels");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const removeContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

const addContact = async (body) => {
  return await new Contact(body).save();
};

const updateContact = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, body, { new: true });
};

const favoriteContact = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,  
  updateContact,
  favoriteContact,
};