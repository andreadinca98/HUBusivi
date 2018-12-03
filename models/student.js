//STUDENT
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String
})

module.exports = mongoose.model('Student', studentSchema);


/*
var uniqid = require('uniqid');     //se chiamato restituisce id univoco

var usersTable = global.usersTable  
if ( usersTable == null )
	usersTable = [];    //array vuoto

class Student {

	async save() {
		let matchingUserId = -1;

		if (this.id == undefined) {
			this.id = uniqid();
		}
		else {
            //  3 uguali -> esattamente uguale a ...
            //    restituisce l'index della tabella dove andiamo ad inserire gli user, "e" non so a cosa si riferisce
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
			usersTable.splice(matchingUserId, 1);   //qua va ad eliminarla con splice
			return true;
		}
		return false; 
	}

	static remove(criterias) {
		let matchingUserId = usersTable.findIndex(e => e.id === criterias.id)
		if(matchingUserId!=-1) {
			usersTable.splice(matchingUserId, 1);   //"1" sta per quante eliminarne appunto solo una persona
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

module.exports = Student;
*/



