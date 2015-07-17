angular.module('daniel')

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider

		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'AppCtrl'
		})
		.state('app.start', {
			url: '/start',
			views: {
				'menuContent': {
					templateUrl: 'templates/start.html'
				}
			}
		});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/start');
});