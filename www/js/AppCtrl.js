angular.module('daniel')

.controller('AppCtrl', function ($scope, $ionicPopup, DataSvc) {
	$scope.days = DataSvc.days;
	$scope.day = 0;

	$scope.setDate = function (id) {
		DataSvc.refresh();
		if ($scope.days[id].class === 'future') {
			$ionicPopup.alert({
				title: DataSvc.popup.title,
				template: DataSvc.popup.template
			});
			return;
		}
			
		$scope.day = id;
	};
	
	$scope.change = function() {
		DataSvc.save();
	};
	
	var count = 0;
	$scope.onHold = function() {
		count++;
		if (count === 2) {
			$ionicPopup.alert({
				title: 'Wie mutig!',
				template: '<img src="img/egg.jpg" />'
			});
			return;
		}
		$ionicPopup.alert({
			title: 'Du hast das Easter-Egg gefunden!',
			template: 'Leider ist es nichts besonderes, nur Text. Mehr ist in so kurzer Zeit leider nicht drin :D - Alles Gute!'
		});
	};
});