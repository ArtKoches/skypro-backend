const welcomeToLibrary = (request, response) => {
	response.status(200)  
	response.send('Welcome to the library of your dreams!')
}

module.exports = { welcomeToLibrary }