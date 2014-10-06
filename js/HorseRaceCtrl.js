function HorseRaceCtrl($scope) {
  $scope.delay = DEFAULT_DELAY;

  $scope.reset = function() {
    $scope.stop();
    $scope.deck = _.shuffle(deck);

    $scope.clubs = [];
    $scope.hearts = [];
    $scope.spades = [];
    $scope.diamonds = [];

    $scope.lead = 0;
    $scope.announcement = "";

  };

  $scope.draw = function() {
    if ($scope.deck.length > 0) {
      var card = $scope.deck.pop();
      var suit = card.split("-")[2];
      $scope[suit].push(card);

      $scope.announcements();

      if ($scope.clubs.length == WIN
        || $scope.hearts.length == WIN
        || $scope.spades.length == WIN
        || $scope.diamonds.length == WIN) {
        $scope.stop();
      }
    }
  };

  $scope.announcements = function() {
    announcements = [];

    var position_to_suits = {};
    var positions = [];
    for (var i = 0; i < suits.length; i++) {
      var suit = suits[i];
      var position = $scope[suit].length;
      if (!position_to_suits[position]) {
        position_to_suits[position] = [];
      }
      position_to_suits[position].push(suit);
      positions.push(position);
    }
    positions.sort();

    var leading_position = positions[positions.length - 1];
    var first = position_to_suits[leading_position];
    if (first.length == 1) {
      if (first == $scope.first) {
        announcements.push(first + " keeps the lead!");
      } else {
        announcements.push(first + " takes the lead!");
      }
      $scope.first = first;
    } else {
      var tie = first[0];
      for (var i = 1; i < first.length; i++) {
        tie += " and " + first[i];
      }
      tie += " tie for the lead!";
      announcements.push(tie);
    }

    if (leading_position == WIN) {
      announcements.push($scope.first + " wins!!");
    }
    $scope.announcement = announcements;
  };

  $scope.start = function() {
    if ($scope.timer) {
      $scope.reset();
    }
    $scope.timer = setInterval(function() {
      $scope.$apply(function() {
        $scope.draw();
      });
    }, $scope.delay);
  };

  $scope.stop = function() {
    clearInterval($scope.timer);
  };


  $scope.reset();
}
