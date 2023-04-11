const putValidate = (schema) => {
	const valid = (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			next(res.status(400), error.message);
		}
		next();
	};
	return valid;
};

module.exports = putValidate;