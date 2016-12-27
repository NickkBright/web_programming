
class Unit extends Team{	
	constructor(name, surname, age, weapon, spec,  lead, id) {
		super(name, surname, age);
		this.weapon = weapon;
        this.spec=spec;
		this.id = id;
        this.lead = lead;
	}
}