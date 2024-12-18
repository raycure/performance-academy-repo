import Joi from 'joi';

const nameOrSurnameRules = Joi.string()
	.pattern(/^[a-zA-ZçğıöşüÇĞİÖŞÜ\s]+$/)
	.message('Sadece karakterler ve boşluk geçerlidir.')
	.min(2)
	.message('3 karakterden fazla olmalıdır.')
	.max(23)
	.message('24 karakterden az olmalıdır.')
	.required();

const passwordRules = Joi.string()
	// Require at least one lowercase and one uppercase letter
	.pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])'))
	.message('En az birer küçük ve büyük harf gereklidir.')
	// Require at least one digit
	.pattern(new RegExp('(?=.*\\d)'))
	.message('En az bir rakam gereklidir.')
	// Disallow whitespace
	.pattern(new RegExp('^(?!.*\\s)'))
	.message('Boşluk bırakılmamalıdır.')
	// Only allow specific special characters
	.pattern(
		new RegExp(
			'^[a-zA-Z\\d~!?@#$%^&*_\\-\\+\\(\\)\\[\\]\\{\\}><\\/\\\\|"\'\\.,:;]+$'
		)
	)
	.message('Sadece Latin karakterler geçerlidir.')
	// Length between 8 and 24 characters
	.min(8)
	.message('8 karakterden fazla olmalıdır.')
	.max(24)
	.message('24 karakterden az olmalıdır.')
	.required();

const emailRules = Joi.string()
	.email()
	.message('email adresi gecerli formatta olmalidir')
	.required();

const nationalIDRules = Joi.string()
	.pattern(/^[0-9]+$/)
	.length(11)
	.messages({
		'string.pattern.base': 'Sadece sayılar geçerlidir',
		'string.length': '11 rakam olmalıdır.',
	});
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

export { userinfoChangeSchemas, registerSchemas, passwordSchema };
