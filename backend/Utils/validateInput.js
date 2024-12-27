export default function validateInput(values, schemas) {
	try {
		for (const [key, schema] of Object.entries(schemas)) {
			// Perform validation for each key
			const { error } = schema.validate(values[key]);
			if (error) {
				console.log('error in validate inputs', error);
				const ValidationErrorMessage = error.details[0].message;
				const errorField = `validationFields.${key}`;
				const errorMessage = `${ValidationErrorMessage}`;
				// it returns keys that are required for translation it deosnt return the message itself
				throw { errorMessage, errorField };
			}
		}
		return { success: true };
	} catch (error) {
		console.log('valid inputta err', error);
		throw {
			message: error,
		};
	}
}
