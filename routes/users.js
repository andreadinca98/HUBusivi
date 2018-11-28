const express = require('express');
const User   = require('../models/user');
const usersRoutes = express.Router(); 

usersRoutes.get('/user', async function(req, res) {	
	let users = await User.find({});
	res.json(users);
})
usersRoutes.post('/user', async function (req, res) {
	var user = new User();
	user.name = req.body.name;
	user.password = req.body.password;
	user.admin = req.body.admin;

	// save the bear and check for errors
	saved = await user.save()
	res.json(saved)
})

usersRoutes.get('/:user_id', async function(req, res) {
	let user_id = req.params.user_id
	if ( user_id == 'me' )
		user_id = req.user.id
	let user = await User.findOne( { id: user_id } );
	res.json(user);
})
usersRoutes.delete('/:user_id',function (req, res) {
	if( User.remove({ id: req.params.user_id }) )
		res.json({ message: 'Successfully deleted' });
	else
		res.json({ message: 'invalid id' });
})
usersRoutes.put('/:user_id',  
    async function(req, res) {
	let user = await User.findOrCreate( { id: req.params.user_id } );
	// update info
	user.name = req.body.name || user.name;
	user.password = req.body.password || user.password;
	user.admin = req.body.admin;
})


module.exports = usersRoutes;