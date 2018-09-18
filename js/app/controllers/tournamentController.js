lanoelApp.controller('TournamentController', function($scope, $http, $routeParams, $filter, lanoelService, $interval) {
	$scope.tournament = null;
	$scope.scores = [];
	$scope.rounds = [];
	$scope.selectedRound = null;

	$scope.refresh = function()
	{
		lanoelService.getLanoelTournament().then(function (result) {
			$scope.tournament = result;
			$scope.selectedRound = $scope.tournament.rounds[0];
		});
	}

	$scope.refresh();

    $scope.onTabClick = function(round)
	{
		$scope.selectedRound = round;
	}

	$interval($scope.refresh, 5000);
});
