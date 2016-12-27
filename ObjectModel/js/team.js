class Team{
	constructor(name, surname, age) {
    	this.name = name;
        this.surname=surname;
		this.age = age;
		Team.id += 1;
	}
}

Team.id = 0;