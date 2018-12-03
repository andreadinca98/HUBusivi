var uniqid = require('uniqid');     //se chiamato restituisce id univoco

var assignmentTable = global.assignmentTable  
if ( assignmentTable == null )
	assignmentTable = [];    //array vuoto

class Assignment {

	async save() {
		let matchingAssignmentId = -1;

		if (this.id == undefined) {
			this.id = uniqid();
		}
		else {
            //restituisce l'index della tabella dove andiamo ad inserire gli Teacher
            matchingAssignmentId = assignmentTable.findIndex(e => e.id === this.id)   
		}

		// if no matches
		if (matchingAssignmentId == -1)
			assignmentTable.push(this);
		else
			assignmentTable[matchingAssignmentId] = this;
		
		return this;
	}

	async delete() {
		let matchingAssignmentId = assignmentTable.findIndex(e => e.id === this.id)
		if(matchingAssignmentId!=-1) {
			assignmentTable.splice(matchingAssignmentId, 1);   //qua va ad eliminarla con splice
			return true;
		}
		return false; 
	}

	static remove(criterias) {
		let matchingAssignmentId = assignmentTable.findIndex(e => e.id === criterias.id)
		if(matchingAssignmentId!=-1) {
			assignmentTable.splice(matchingAssignmentId, 1);   //"1" sta per quante eliminarne appunto solo una persona
			return true;
		}
		return false; 
	}

	static async find(criterias) {
		let matchingAssignment = assignmentTable.filter(u => {
			return criterias.name == undefined ? true : u.name === criterias.name
			&&     criterias.id == undefined ? true : u.id === criterias.id
		});
		return matchingAssignment;
	}

	static async findOne(criterias) {
		let assignment = await this.find(criterias)
		let firstAssignment = assignment.length==0 ? null : assignments[0]
		return firstAssignment;
    }
    
    static async findAll(criterias){
        let matchingAssignment = dbo.filter(u => {
			return criterias.AssignmentId == u.AssignmentId
		});
		return matchingAssignment;
    }
	// this returns a Promise as much as an async function
	static findOrCreate(criterias) {
		return this.findOne(criterias)
		.then( (assignment) => {
			if (assignment)
				return assignment
			else {
				if (criterias.id == undefined) {
					criterias.id = uniqid();
				}
				assignmentTable.push(criterias);
				return criterias;
			}
		})
	}
};

module.exports = Assignment;