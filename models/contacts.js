const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const updateFile = async (data) =>
      await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");

    await updateFile(updatedContacts);
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: nanoid(8) };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const i = contacts.findIndex((contact) => contact.id === contactId);
    if (i === -1) {
      return null;
    }
    contacts[i] = { ...contacts[i], ...body };

    const updateFile = async (data) =>
      await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");

    await updateFile(contacts);
    return contacts[i];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
