angular.module('daniel')

.service('DataSvc', function(localStorageService) {
	var self = this;
	var now = new Date().getTime();
	var confTime = new Date(2015,06,01,22,50);
	
	self.offset = 1000*60*120;
	
	self.popup = {
		title: 'Nicht so voreillig!',
		template: 'Nächste Agenda gibt es ab 22 Uhr'
	};
	self.notis = {
		title: 'Hey Kuno',
		description: 'Es gibt was neues zu entdecken'
	};

	self.days = [
		{
			label: 'WELCOME',
			title: 'WELCOME',
			img: 'img/welcome.png',
			text: 'Deine Famile, deine Freunde und deine Kollegen haben es möglich gemacht.<br>Du wirst bald 22, wir haben ein Flugticket für Juliane und den Start in ein unvergessliches Wochenende finanziert. <br>Komplitze 1: Stefan für den Flughafentransport <br>Komplitze 2: Anna für ein „Wochenende“ in Washington. Sie wusste von Anfang an bescheid. <br>Da du deine Gedanken in Washington gesteckt hast, haben wir uns Gedanken gemacht, was New York für euch beide zu bieten hat. <br>Für jeden Tag gibt es einen neue Agenda, die erste ist freigeschaltet. <br>Wir wünschen dir ein schönes Wochenende.'
		},
		{
			label: 'DAY 1 // 02. JUL',
			title: 'DAY 1',
			img: 'img/d1.png',
			date: new Date(2015,06,02).getTime(),
			todos: [
				{label: 'Staunen', done: null},
				{label: 'Sabbern', done: null},
				{label: 'Schreien', done: null},
				{label: 'Zum Hotel fahren', done: null},
				{label: 'Abendbrot', done: null}

			]
		},
		{
			label: 'DAY 2 // 03. JUL',
			title: 'DAY 2',
			img: 'img/d2.png',
			date: new Date(2015,06,03).getTime(),
			todos: [
				{label: 'Zweisamkeit', done: null},
				{label: 'Ein bisschen Romantik', done: null},
				{label: 'Delaware Water Gap (durch gestern erst heute)', done: null},
				{label: 'Alles wird 1000x schöner, weil wir es zusammen erleben', done: null}
			]
		},
		{
			label: 'DAY 3 // 04. JUL',
			title: 'DAY 3',
			img: 'img/d3.png',
			date: new Date(2015,06,04).getTime(),
			todos: [
				{label: 'Frühstück im Centralpark', done: null},
				{label: 'Meet and Greet', done: null},
				{label: 'Time Square', done: null},
				{label: 'Brooklyn Bridge', done: null},
				{label: 'Unioin Square', done: null},
				{label: 'Den 4th of July richtig auskosten und die Parade + Feuerwerk angucken', done: null}

			]
		},
		{
			label: 'DAY 4 // 05. JUL',
			title: 'DAY 4',
			img: 'img/d4.png',
			date: new Date(2015,06,05).getTime(),
			todos: [
				{label: 'Zweisamkeit', done: null},
				{label: 'Museum – The Met', done: null},
				{label: 'Willamsburg – Das Fhain von New York', done: null},
				{label: 'Reinfeiern im „The east village“ – Der Prenzlberg von New York ', done: null}
			]
		},
		{
			label: 'DAY 5 // 06. JUL',
			title: 'DAY 5',
			img: 'img/d5.png',
			date: new Date(2015,06,06).getTime(),
			todos: [
				{label: 'Happy Birthday', done: null},
				{label: 'Frühstück', done: null},
				{label: 'Goodbye Juliane', done: null},
				{label: 'Arbeit, Arbeit, Arbeit', done: null},
				{label: 'Feierabend', done: null}
			]
		}
	];
	
	self.save = function() {
		var toSave = [];
		for (var i = 1; i < self.days.length; i++) {
			if (!self.days[i].todos) { continue; }
			
			toSave.push(self.days[i].todos);
		}
		localStorageService.set('todos', toSave);
		localStorageService.set('tstmp', confTime);
	};
	
	self.load = function() {
		for (var i = 1; i< self.days.length; i++) {
			self.days[i].date -= self.offset;
		}
		self.refresh();
		var todos = localStorageService.get('todos');
		var tstmp = new Date(localStorageService.get('tstmp'));
		if (!todos) {return;}
		if (tstmp && tstmp < confTime) {
			return;
		}
		console.info('loaded lists from cache');
		
		var counter = 0;
		for (var j = 1; j < self.days.length; j++) {
			if (!self.days[j].todos) { continue; }
			
			self.days[j].todos = todos[counter];
			counter++;
		}
	};
	
	self.refresh = function() {
		now = new Date().getTime();
		console.log('updating');
		for (var i = 1; i< self.days.length; i++) {
			if (now > self.days[i].date) {
				self.days[i].class = 'past';
			} else if (now < self.days[i].date) {
				self.days[i].class = 'future';
			} else {
				self.days[i].class = 'today';
			}
		}
	};
	
	
	self.load();
});