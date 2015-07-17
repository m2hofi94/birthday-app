angular.module('daniel')

.service('Notifier', function ($cordovaLocalNotification, DataSvc) {
	this.start = function () {
		ionic.Platform.ready(function () {
			if (!ionic.Platform.isAndroid()) {
				return;
			}
			
			var times = DataSvc.days;
			var notis = [];
			var now = new Date().getTime();
			for (var i = 1; i < times.length; i++) {
				if (now > times[i].date) {
					continue;
				}
				notis.push({
					id: i,
					title: DataSvc.notis.title,
					text: DataSvc.notis.description,
					at: new Date(times[i].date)
				});
			}
			$cordovaLocalNotification.cancelAll();
			console.log(notis);
			$cordovaLocalNotification.schedule(notis);
		});
	};
});