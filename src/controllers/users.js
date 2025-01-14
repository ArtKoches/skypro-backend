const User = require('../models/user')

const getUsers = (request, response) => {
	// Get all users
	return User.find({})
	.then((data) => {
		response.status(200).send(data)
	})
	.catch((err) => {
		response.status(500).send(err.message)
	})
}

const getUser = (request, response) => {
	// Get user
	const { user_id } = request.params
	return User.findById(user_id)
	.then((user) => {
		if(!user) {
			return response.sendStatus(404)
		}
		response.status(200).send(user)
	})
	.catch((err) => {
		response.status(500).send(err.message)
	})
}

const createUser = (request, response) => {
	// Create new user
	return User.create({ ...request.body })
	.then((user) => {
		response.status(201).send(user)
	})
	.catch((err) => {
		response.status(500).send(err.message)
	})
}

const updateUser = (request, response) => {
	// Update user
	const { user_id } = request.params
	return User.findByIdAndUpdate(user_id, { ...request.body })
	.then((user) => {
		if(!user) {
			return response.sendStatus(404)
		}
		response.status(200).send(user)
	})
	.catch((err) => {
		response.status(500).send(err.message)
	})
}

const deleteUser = (request, response) => {
	// Delete user
	const { user_id } = request.params
	return User.findByIdAndDelete(user_id)
	.then((user) => {
		if(!user) {
			return response.sendStatus(404)
		}
		response.sendStatus(200)
	})
	.catch((err) => {
		response.status(500).send(err.message)
	})
}

module.exports = {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser
}