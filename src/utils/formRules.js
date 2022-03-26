export const formRules = {
	required: (text = 'Field is required!') => ({
		required: true,
		message: text
	})
};