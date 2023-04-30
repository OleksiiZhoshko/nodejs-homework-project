const { listContacts } = require("../../models/contacts");

const FAVORITES = ['true', 'false']

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const { favorite = undefined } = req.query;
  const skip = (page - 1) * limit;

    !favorite || !FAVORITES.includes(favorite)
    ? res.json(await listContacts({ owner }, null, { skip, limit }))
    : res.json(await listContacts({ owner, favorite }, null, { skip, limit }));
};

module.exports = {
    getContacts
}
