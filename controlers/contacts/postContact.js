const { addContact } = require("../../models/contacts");

const postContact = async (req, res) => {
  const { _id: owner } = req.user;
  res.status(201).json(await addContact({ ...req.body, owner }));
}

module.exports = { postContact }