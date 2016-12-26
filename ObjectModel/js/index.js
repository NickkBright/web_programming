'use strict';

class Team{
	constructor(name, surname, age) {
    	this.name = name;
        this.surname=surname;
		this.age = age;
		Team.id += 1;
	}
}

class Unit extends Team{	
	constructor(name, surname, age, weapon, spec,  lead, id) {
		super(name, surname, age);
		this.weapon = weapon;
        this.spec=spec;
		this.id = id;
        this.lead = lead;
	}
}

Team.id = 0;

let units = [];
let commanders = [];

let unit_template = Handlebars.compile($('#unit-template').html());
let commander_template = Handlebars.compile($('#commander-template').html());

let addUnit = () => {
	event.preventDefault();
	let name = $('#create_name').val();
    let surname = $('#create_surname').val();
	let age = $('#create_age').val();
	let weapon = $('#create_weapon').val();
	let spec = $('#create_spec').val();
    let lead = $('#create_lead').val();
		
	let unit = new Unit(name, surname, age, weapon, spec, lead, Team.id);
	console.log(lead);
	switch (lead) {
		case '0':
			units.push(unit);
			console.log(units);
			break;
		case '1':
			commanders.push(unit);
			console.log(commanders);
			break;
		default:
			console.log('Oops! Something went wrong');
			break;
	}
	//compileUnit(lead, Team.id);
	compileUnit(lead);
}

let compileUnit = (lead) => {
    console.log(lead);
    let data;
    let template;
    let content;
    if (lead==0){ template = unit_template; content = $('#unitList')[0]; data = units; }
    if (lead==1){ template = commander_template; content = $('#commList')[0]; data = commanders; }
    let result = template(data);
    content.innerHTML = result;	
}

let deleteUnit = (lead, id) => {
	let array = [];
	let ld;
	switch (lead) {
		case '0':
			array = units;
			break;
		case '1':
			array = commanders;
			break;
		default:
			console.log('Oops! Something went wrong');
			break;
	}
	for(let i = 0; i < array.length; i++) {
        if(array[i].id == id) {
        	ld = array[i].lead
            array.splice(i, 1);
            compileUnit(ld);
            break;
        }
    }
}

let searchUnit = (id, array) => {
	for(let i = 0; i < array.length; index++) {
        if(array[i].id == id) {
            return array[i];
        }
    }
}

let editUnit = (lead, id) => {
    let array = [];
	let ld;
	switch (lead) {
		case '0':
			array = units;
			break;
		case '1':
			array = commanders;
			break;
		default:
			console.log('Oops! Something went wrong');
			break;
	}
    let element = searchUnit(id, array);
	for(let i = 0; i < array.length; i++) {
        if(array[i].id == id) {
        	ld = array[i].lead
            array.splice(i, 1);
            compileUnit(ld);
            break;
        }
    }
    let element = searchUnit(id, array);
    element.name = $('#edit_name').val();
    element.surname = $('#edit_surname').val();
    element.age = $('#edit_age').val();
    element.weapon = $('#edit_weapon').val();
    element.spec = $('#edit_spec').val();
    element.lead = $('#edit_lead').val();
	compileUnit(element.lead);
}

$(document).ready(function() {
	$(document).on('click', '.addUnit', function(){
	    addUnit();
	    $('#unitForm')[0].reset();
	});

	$(document).on('click', '.deleteUnit', function(){
		console.log($(this).parent().parent().parent().prop('id'));
	    deleteUnit($(this).parent().parent().parent().prop('id'), this.id);
	});

	$(document).on('click', '.editUnit', function(){
		editUnit($(this).parent().parent().parent().prop('id'), this.id);
	    //deleteUnit(this.id);
	});
});