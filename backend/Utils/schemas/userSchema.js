import Joi from 'joi';

const nameOrSurnameRules = Joi.string()
	.pattern(/^[a-zA-ZçğıöşüÇĞİÖŞÜ\s]+$/)
	.message('validationErrors.name.onlyChars')
	.min(2)
	.message('validationErrors.name.minLength')
	.max(23)
	.message('validationErrors.name.maxLength')
	.required();

const passwordRules = Joi.string()
	// Require at least one lowercase and one uppercase letter
	.pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])'))
	.message('validationErrors.password.casing')
	// Require at least one digita
	.pattern(new RegExp('(?=.*\\d)'))
	.message('validationErrors.password.digit')
	// Disallow whitespace
	.pattern(new RegExp('^(?!.*\\s)'))
	.message('validationErrors.password.noWhitespace')
	// Only allow specific special characters
	.pattern(
		new RegExp(
			'^[a-zA-Z\\d~!?@#$%^&*_\\-\\+\\(\\)\\[\\]\\{\\}><\\/\\\\|"\'\\.,:;]+$'
		)
	)
	.message('validationErrors.password.latinOnly')
	// Length between 8 and 24 characters
	.min(8)
	.message('validationErrors.password.minLength')
	.max(24)
	.message('validationErrors.password.maxLength')
	.required();
// .messages({
// 	'any.required': 'required password test',
// 	// 'string.empty': 'required password test',
// });

const emailRules = Joi.string()
	.email()
	.message('validationErrors.email.invalid')
	.required();

const nationalIDRules = Joi.string()
	.pattern(/^[0-9]+$/)
	.length(11)
	.messages({
		'string.pattern.base': 'validationErrors.nationalId.numbersOnly',
		'string.length': 'validationErrors.nationalId.length',
	});

const topicRules = Joi.string()
	.min(3)
	.message('validationErrors.topic.minLength')
	.max(250)
	.message('validationErrors.topic.maxLength')
	.required();

const questionRules = Joi.string()
	.min(3)
	.message('validationErrors.question.minLength')
	.max(75)
	.message('validationErrors.question.maxLength')
	.required();

const loginSchema = Joi.object({
	email: Joi.string().email().optional(),
	nationalID: Joi.string().optional(),
	password: Joi.string().required(),
})
	.xor('email', 'nationalID')
	.messages({
		'object.xor': 'loginResponses.credentialType',
		'object.missing': 'loginResponses.emailOrIdMissing',
		'string.email': 'validationErrors.email.invalidForLogin',
	});

// all of the schemas reuire the same key when theyre being used exp newpassword, passwordSchema wouldn work but password: newpassword, passwordSchema would

const registerSchemas = {
	email: emailRules,
	password: passwordRules,
	nationalID: nationalIDRules,
	name: nameOrSurnameRules,
	surname: nameOrSurnameRules,
};
const userinfoChangeSchemas = {
	name: nameOrSurnameRules,
	surname: nameOrSurnameRules,
	email: emailRules,
};

const passwordSchema = {
	password: passwordRules,
};

const privateContactSchema = {
	topic: topicRules,
	question: questionRules,
};

const publicContactSchema = {
	name: nameOrSurnameRules,
	surname: nameOrSurnameRules,
	email: emailRules,
	topic: topicRules,
	question: questionRules,
};

export {
	userinfoChangeSchemas,
	registerSchemas,
	passwordSchema,
	publicContactSchema,
	loginSchema,
	privateContactSchema,
};
