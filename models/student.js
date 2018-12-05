//STUDENT 
/*
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type:String, require: true},
	cognome: { type:String, require: true},
	email: { type:String, require: true},
	password: {typre: Number, require: true}
});

module.exports = mongoose.model('Student', studentSchema);
*/

var uniqid = require('uniqid');

var usersTable = global.usersTable
if ( usersTable == null )
	usersTable = [];

class User {

	async save() {
		let matchingUserId = -1;

		if (this.id == undefined) {
			this.id = uniqid();
		}
		else {
			matchingUserId = usersTable.findIndex(e => e.id === this.id)
		}

		// if no matches
		if (matchingUserId == -1)
			usersTable.push(this);
		// if at least one match, replace the first one at index 0 with this
		else
			usersTable[matchingUserId] = this;
		
		return this;
	}

	async delete() {
		let matchingUserId = usersTable.findIndex(e => e.id === this.id)
		if(matchingUserId!=-1) {
			usersTable.splice(matchingUserId, 1);
			return true;
		}
		return false; 
	}

	static remove(criterias) {
		let matchingUserId = usersTable.findIndex(e => e.id === criterias.id)
		if(matchingUserId!=-1) {
			usersTable.splice(matchingUserId, 1);
			return true;
		}
		return false; 
	}

	static async find(criterias) {
		//to be implemented filters users by criterias e.g. {name:pippo, id:1234}
		let matchingUsers = usersTable.filter(u => {
			return criterias.name == undefined ? true : u.name === criterias.name
			&&     criterias.id == undefined ? true : u.id === criterias.id
		});
		return matchingUsers;
	}

	static async findOne(criterias) {
		let users = await this.find(criterias)
		let firstUser = users.length==0 ? null : users[0]
		return firstUser;
	}

	// this returns a Promise as much as an async function
	static findOrCreate(criterias) {
		return this.findOne(criterias)
		.then( (user) => {
			if (user)
				return user
			else {
				if (criterias.id == undefined) {
					criterias.id = uniqid();
				}
				usersTable.push(criterias);
				return criterias;
			}
		})
	}

};

module.exports = User;
