var View = function(game) {
  this.game = game;
  this.dealerHand = this.game.dealerHand.cardsInHand;
  this.playerHand = this.game.playerHand.cardsInHand;
};

View.prototype.displayCards = function() {
  this.showDealerCards();
  this.showPlayerCards();
  this.handleButtons();
};

View.prototype.showDealerCards = function() {
  var dealerCards = $l(".dealer-cards");
  $l(".dealer-cards").empty();
  for (var i = 0; i < this.dealerHand.length; i++) {
    var klass;
    if (i === 0) {
      klass = "face-down";
    } else {
      klass = this.dealerHand[i].value + "-" + this.dealerHand[i].suit;
    }
    dealerCards.append("<li class=" + klass + "></li>");
  }
};

View.prototype.revealAllCards = function() {
  var dealerCards = $l(".dealer-cards");
  $l(".dealer-cards").empty();
  for (var i = 0; i < this.dealerHand.length; i++) {
    var klass = this.dealerHand[i].value + "-" + this.dealerHand[i].suit;
    dealerCards.append("<li class=" + klass + "></li>");
  }
};

View.prototype.showPlayerCards = function() {
  var playerCards = $l(".player-cards");
  $l(".player-cards").empty();
  for (var i = 0; i < this.playerHand.length; i++) {
    var klass = this.playerHand[i].value + "-" + this.playerHand[i].suit;
    playerCards.append("<li class=" + klass + "></li>");
  }
};

View.prototype.handleButtons = function() {
  $l(".deal-cards-button").remove();
  $l(".game-buttons").append("<button id='hit'>Hit</button>");
  $l(".game-buttons").append("<button id='stay'>Stay</button>");
  $l("#hit").addClass("hit-button");
  $l("#stay").addClass("stay-button");
  $l("#hit").on("click", function() {
    this.handleHit();
  }.bind(this));
  $l("#stay").on("click", function() {
    this.handleStay();
  }.bind(this));
};

View.prototype.handleHit = function(game) {
  this.game.hit();
};

View.prototype.handleStay = function() {
  this.game.stay();
};

View.prototype.renderBusted = function() {
  $l(".hit-button").remove();
  $l(".stay-button").remove();
  var playerScore = this.game.playerHand.score();
  $l(".game-buttons").append("<div class='game-over'>Busted!</div>");
  $l(".game-buttons").append("<div class='game-over'>Your score: " + playerScore + "</div>");
  $l(".game-buttons").append("<div class='game-over'>Try again!</div>");
  $l(".game-buttons").append("<button>Deal In</button>");
  $l(".game-buttons > button").addClass("deal-cards-button");
};

View.prototype.renderWinner = function() {
  $l(".hit-button").remove();
  $l(".stay-button").remove();
  var playerScore = this.game.playerHand.score();
  var dealerScore = this.game.dealerHand.score();
  $l(".game-buttons").append("<div class='game-over'>Winner!</div>");
  $l(".game-buttons").append("<div class='game-over'>Your score: " + playerScore + "</div>");
  $l(".game-buttons").append("<div class='game-over'>Dealer score: " + dealerScore + "</div>");
  $l(".game-buttons").append("<button>Deal In</button>");
  $l(".game-buttons > button").addClass("deal-cards-button");
};

View.prototype.renderLoser = function() {
  $l(".hit-button").remove();
  $l(".stay-button").remove();
  var playerScore = this.game.playerHand.score();
  var dealerScore = this.game.dealerHand.score();
  $l(".game-buttons").append("<div class='game-over'>Loser!</div>");
  $l(".game-buttons").append("<div class='game-over'>Your score: " + playerScore + "</div>");
  $l(".game-buttons").append("<div class='game-over'>Dealer score: " + dealerScore + "</div>");
  $l(".game-buttons").append("<button>Deal In</button>");
  $l(".game-buttons > button").addClass("deal-cards-button");
};
