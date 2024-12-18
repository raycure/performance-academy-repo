export default function validateInput(values, schemas) {
	try {
		for (const [key, schema] of Object.entries(schemas)) {
			// Perform validation for each key
			const { error } = schema.validate(values[key]);
			console.log('key here', key);

			if (error) {
				const ValidationErrorMessage = error.details[0].message;
				const errorField = key;
				const errorMessage = `error in ${errorField} field. The error: ${ValidationErrorMessage}`;
				throw errorMessage;
			}
		}
		return { success: true };
	} catch (error) {
		throw {
			message: error,
		};
	}
}
