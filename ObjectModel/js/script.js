'use strict';
Handlebars.registerHelper('leadWord', function() {
	if (this.lead == '0')
		return 'No';
	if (this.lead == '1')
		return 'Yes';
});


let units = [];
let commanders = [];

let unit_template = Handlebars.compile($('#unit-template').html());
let commander_template = Handlebars.compile($('#commander-template').html());

let setArray = (lead) => {
	switch (lead) {
		case '0':
			return units;
			break;
		case '1':
			return commanders;
			break;
		default:
			console.log('Oops! Something went wrong');
			break;
	}
}

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
	array = setArray(lead);
	for(let i = 0; i < array.length; i++) {
        if(array[i].id == id) {
        	ld = array[i].lead
            array.splice(i, 1);
            compileUnit(ld);
            break;
        }
    }
}


let editUnit = (lead, id) => {
    console.log(lead);
    let array = [];
	let ld;
	array = setArray(lead);
	for(let i = 0; i < array.length; i++) {
        if(array[i].id == id) {
        	ld = array[i].lead;
            array[i].name = $('#editUnit-modal'+id.toString()+' #edit_name').val();
            array[i].surname = $('#editUnit-modal'+id.toString()+' #edit_surname').val();
            array[i].age = $('#editUnit-modal'+id.toString()+' #edit_age').val();
            array[i].weapon = $('#editUnit-modal'+id.toString()+' #edit_weapon').val();
            //array[i].spec = $('#edit_spec').val();
            //array[i].lead = $('#edit_lead').val();
            compileUnit(ld);
            break;
        }
    }
}
$(document).on('click', '.modal', function(){
    $('select').material_select();
});
$(document).on('click', '.modal', function(){
    $('.modal').modal();
    $('select').material_select();
    Materialize.updateTextFields();
});
$(document).ready(function() {
    $('.modal').modal();  
    $('select').material_select();
	$(document).on('click', '.addUnit', function(){
	    addUnit();
	    $('#unitForm')[0].reset();
	});

	$(document).on('click', '.deleteUnit', function(){
		console.log($(this).parent().prop('id'));
	    deleteUnit($(this).parent().prop('id'), this.id);
	});

	$(document).on('click', '.editUnit', function(){
        console.log($(this).parent().attr('id'));
		editUnit($(this).parent().attr('id'), this.id);
	    //deleteUnit(this.id);
	});
});
class Team{
	constructor(name, surname, age) {
    	this.name = name;
        this.surname=surname;
		this.age = age;
		Team.id += 1;
	}
}

Team.id = 0;

class Unit extends Team{	
	constructor(name, surname, age, weapon, spec,  lead, id) {
		super(name, surname, age);
		this.weapon = weapon;
        this.spec=spec;
		this.id = id;
        this.lead = lead;
	}
}