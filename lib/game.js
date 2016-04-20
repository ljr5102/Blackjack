var Game = function() {
  this.deck = new Deck();
  this.dealerHand = new Hand();
  this.playerHand = new Hand();
  this.gameView = new View(this);
  this.playerChips = 10;
};

Game.prototype.initialDeal = function() {
  this.takeBets();
  for (var i = 0; i < 2; i++) {
    this.playerHand.addCardToHand(this.deck.dealFromTop());
    this.dealerHand.addCardToHand(this.deck.dealFromTop());
  }
};

Game.prototype.playNewHand = function() {
  this.gameView.discardAllCards();
  this.takeBets();
  if(this.deck.cards.length < 10) {
    this.deck = new Deck();
  }
  this.playerHand = new Hand();
  this.dealerHand = new Hand();
  for (var i = 0; i < 2; i++) {
    this.playerHand.addCardToHand(this.deck.dealFromTop());
    this.dealerHand.addCardToHand(this.deck.dealFromTop());
  }
  this.gameView.displayCards();
};

Game.prototype.takeBets = function() {
  var betAmount = $l(".player-bet").first.value;
  if (betAmount) {
    this.bet = parseInt(betAmount);
  } else {
    this.bet = 0;
  }
  if(this.bet > this.playerChips) {
    this.bet = 0;
  }
};

Game.prototype.playerLost = function() {
  if(this.bet) {
    this.playerChips -= this.bet;
  }
};

Game.prototype.playerWon = function() {
  if(this.bet) {
    this.playerChips += this.bet;
  }
};

Game.prototype.hit = function() {
  this.playerHand.addCardToHand(this.deck.dealFromTop());
  this.gameView.showPlayerCards();
  if(this.playerHand.busted()) {
    this.playerLost();
    this.gameView.revealAllCards();
    this.gameView.renderBusted();
    this.resetGame();
  }
};

Game.prototype.stay = function() {
  this.gameView.revealAllCards();
  this.handleDealer();
};

Game.prototype.handleDealer = function() {
  while(this.dealerHand.score() < 17) {
    this.dealerHand.addCardToHand(this.deck.dealFromTop());
    this.gameView.revealAllCards();
  }
  this.determineWinner();
};

Game.prototype.determineWinner = function() {
  if(this.playerHand.beats(this.dealerHand)) {
    this.playerWon();
    this.gameView.renderWinner();
    this.resetGame();
  } else {
    this.playerLost();
    this.gameView.renderLoser();
    this.resetGame();
  }
};

Game.prototype.resetGame = function() {
  $l(".deal-cards-button").on("click", function() {
    $l(".game-over").remove();
    // var newGame = new Game();
    // this.initialDeal();
    // this.gameView.displayCards();
    this.playNewHand();
  }.bind(this));
};

$l(function() {
  $l.ajax({
    method: "GET",
    url: "http://api.nytimes.com/svc/topstories/v1/technology.json?api-key=21619e1a7968b4356bcb2c184b219515:6:75059186",
    success: function(data) {
      var rand = Math.floor(Math.random() * data.num_results);
      $l("#title").html(data.results[rand].title);
      $l("#abstract").html(data.results[rand].abstract);
      $l("#url").html(data.results[rand].title);
      $l("#url").attr("href", data.results[rand].url);
    }
  });

  $l(".deal-cards-button").on("click", function() {
    var newGame = new Game();
    newGame.initialDeal();
    newGame.gameView.displayCards();
  });
});
