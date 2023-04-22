const { addContact } = require("../../models/contacts");

const postContact = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json(contact);
    next();
  } catch (error) {
    return res.status(400).json({ message: "missing required name field"});
  }
}

module.exports = {postContact}