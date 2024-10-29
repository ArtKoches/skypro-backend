const requestUrl = (request, response, next) => {
	console.log(`Запрос пришел с адреса ${request.url}`)
	next()
}

module.exports = requestUrl