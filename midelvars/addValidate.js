const objectFieldsChecker = (object) => {
	const FIELDS = ["name", "email", "phone"];
	const allowFields = FIELDS.filter((field) => object[field] === undefined);
	if (allowFields.length > 1) {
		return `missing required ${allowFields.join(", ")} fields`;
	}
	return `missing required ${allowFields[0]} field`;
};

const addValidator = (schema) => {
	const valid = (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			const message = objectFieldsChecker(req.body);
            next(res.status(400).json({ message }))
		}
		next();
	};
	return valid;
};

module.exports = addValidator;