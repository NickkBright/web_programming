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

let addUnit = () => {
	event.preventDefault();
	let name = $('#_name').val();
    let surname = $('#_surname').val();
	let age = $('#_age').val();
	let weapon = $('#_weapon').val();
	let spec = $('#_spec').val();
    let lead = $('#_lead').val();
		
	$('#unitForm')[0].reset();
	let unit = new Unit(name, surname, age, weapon, spec, lead, Team.id);
	units.push(unit);
	console.log(units);
	compileUnit(lead, Team.id);
}



let compileUnit = (lead) => {
    console.log(lead);
    let data = units;
    let template;
    let content;
    if (lead==0){ template = Handlebars.compile($('#unit-template').html()); content = $('#unitList')[0]}
    if (lead==1){ template = Handlebars.compile($('#commander-template').html()); content = $('#commList')[0]}
    let result = template(data);
    content.innerHTML = result;	
}

let deleteUnit = (lead, id) => {
    let tmp;
	for(let i = 0; i < units.length; i++) {
        if(units[i].id == id) {
            tmp = units[i].lead;
            console.log(tmp);
            units.splice(i, 1);
            break;
        }
    }
    compileUnit(tmp);
}

let editUnit = (id) => {
	for(let i = 0; i < units.length; i++) {
        if(units[i].id == id) {
			$('#_name').val(units[i].name);
            $('#_surname').val(units[i].surname);
			$('#_age').val(units[i].age);
			$('#_weapon').val(units[i].weapon);
			$('#_spec').val(units[i].spec);
            $('#_lead').val(units[i].lead)
            break;
        }
    }
    addUnit();
}

$(document).on('click', '.addUnit', function(){
    addUnit();
});

$(document).on('click', '.deleteUnit', function(){
    deleteUnit(this.lead, this.id);
});

$(document).on('click', '.editUnit', function(){
	editUnit(this.id);
    deleteUnit(this.lead, this.id);
});
