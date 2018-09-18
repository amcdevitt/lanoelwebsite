lanoelApp.controller('UpdateScoresController', function($scope, $http, $routeParams, $location, $timeout, $animate, lanoelService) {
	$scope.tournament = null;
	$scope.scores = [];
	$scope.rounds = [];
	$scope.selected = null;

	$scope.selectedRound = null;

	function getLanoelTournament() {
		lanoelService.getLanoelTournament().then(function(result){
			$scope.tournament = result;
			$scope.scores = $scope.tournament.scores;
			$scope.rounds = $scope.tournament.rounds;
			$scope.selectedRound = $scope.rounds[0];
		})
	}

    $scope.onTabClick = function(round)
	{
		$scope.selectedRound = round;
	}

	$scope.onSubmit = function()
	{
		$scope.updateScoreValues();
		$scope.postUpdateScore();
	}

	$scope.postUpdateScore = function()
	{
		lanoelService.updateLanoelScore($scope.selectedRound.places, $scope.selectedRound.roundNumber).then(function(result){
			document.getElementById("scorePanel").className = "panel panel-success lanoeltransition";
			$timeout(function(){
				document.getElementById("scorePanel").className = "panel panel-info lanoeltransition";
			}, 1000);
		}, function(result){
			document.getElementById("scorePanel").className = "panel panel-error lanoeltransition";
			$timeout(function(){
				document.getElementById("scorePanel").className = "panel panel-info lanoeltransition";
			}, 1000);
		});
	}

	$scope.updateScoreValues = function()
	{
		for(var i = 0; i < $scope.selectedRound.places.length; i++)
		{
			$scope.selectedRound.places[i].place = i + 1;
		}
	}

	function init() {
		getLanoelTournament();
	}
	init();
});
