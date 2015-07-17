angular.module('daniel')
	
.run(function ($ionicPlatform,Notifier) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
	Notifier.start();
})

.config(function(localStorageServiceProvider, $ionicConfigProvider) {
	localStorageServiceProvider
    	.setPrefix('daniel');
	$ionicConfigProvider.scrolling.jsScrolling(false);
});