const validateError = {
	422: 'Todos os campos são obrigatórios!',
	401: 'Não autorizado. Por favor, cadastre-se',
};

export function validateUserBody(userData) {
	const { username, avatar } = userData;
	if (!username || !avatar) throw buildError(422);
	return;
}

export function validateTweetBody(tweetData) {
	const { username, tweet } = tweetData;

	if (!tweet) throw buildError(422);
	if (!username) throw buildError(401);
	return;
}

function buildError(code) {
	return { code, message: validateError[code] };
}
