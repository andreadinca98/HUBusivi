var uniqid = require('uniqid');     //se chiamato restituisce id univoco

var teachersTable = global.teachersTable  
if ( teachersTable == null )
	teachersTable = [];    //array vuoto

class Teacher {

	async save() {
		let matchingTeacherId = -1;

		if (this.id == undefined) {
			this.id = uniqid();
		}
		else {
            /*  3 uguali -> esattamente uguale a ...
                restituisce l'index della tabella dove andiamo ad inserire gli Teacher, "e" non so a cosa si riferisce */
            matchingTeacherId = teachersTable.findIndex(e => e.id === this.id)   
		}

		// if no matches
		if (matchingTeacherId == -1)
			teachersTable.push(this);
		// if at least one match, replace the first one at index 0 with this
		else
			teachersTable[matchingTeacherId] = this;
		
		return this;
	}

	async delete() {
		let matchingTeacherId = teachersTable.findIndex(e => e.id === this.id)
		if(matchingTeacherId!=-1) {
			teachersTable.splice(matchingTeacherId, 1);   //qua va ad eliminarla con splice
			return true;
		}
		return false; 
	}

	static remove(criterias) {
		let matchingTeacherId = teachersTable.findIndex(e => e.id === criterias.id)
		if(matchingTeacherId!=-1) {
			teachersTable.splice(matchingTeacherId, 1);   //"1" sta per quante eliminarne appunto solo una persona
			return true;
		}
		return false; 
	}

	static async find(criterias) {
		//to be implemented filters Teachers by criterias e.g. {name:pippo, id:1234}
		let matchingTeachers = teachersTable.filter(u => {
			return criterias.name == undefined ? true : u.name === criterias.name
			&&     criterias.id == undefined ? true : u.id === criterias.id
		});
		return matchingTeachers;
	}

	static async findOne(criterias) {
		let teachers = await this.find(criterias)
		let firstTeacher = teachers.length==0 ? null : teachers[0]
		return firstTeacher;
	}

	// this returns a Promise as much as an async function
	static findOrCreate(criterias) {
		return this.findOne(criterias)
		.then( (teacher) => {
			if (teacher)
				return teacher
			else {
				if (criterias.id == undefined) {
					criterias.id = uniqid();
				}
				teachersTable.push(criterias);
				return criterias;
			}
		})
	}
};

module.exports = Teacher;



