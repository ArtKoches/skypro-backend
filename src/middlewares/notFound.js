const notFound = (request, response, next) => {
	response.sendStatus(404)
}

module.exports = notFound