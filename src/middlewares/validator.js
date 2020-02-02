/**
 *
 * @param schema
 * @param property
 * @returns {Function}
 */
const validator = (schema, property) => {
    return (req, res, next) => {

        const { error } = schema.validate(req[property],  { abortEarly: true });
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            res.status(422).json({ error: message }); }
    };
};

module.exports = validator;