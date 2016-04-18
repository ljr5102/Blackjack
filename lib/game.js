var Game = function() {
  this.deck = new Deck();
  this.dealerHand = new Hand();
  this.playerHand = new Hand();
  this.gameView = new View(this);
};

Game.prototype.initialDeal = function() {
  console.log("We got to deal");
  for (var i = 0; i < 2; i++) {
    this.playerHand.addCardToHand(this.deck.dealFromTop());
    this.dealerHand.addCardToHand(this.deck.dealFromTop());
  }
};

Game.prototype.hit = function() {
  this.playerHand.addCardToHand(this.deck.dealFromTop());
  this.gameView.showPlayerCards();
  if(this.playerHand.busted()) {
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
    this.gameView.renderWinner();
    this.resetGame();
  } else {
    this.gameView.renderLoser();
    this.resetGame();
  }
};

Game.prototype.resetGame = function() {
  $l(".deal-cards-button").on("click", function() {
    $l(".game-over").remove();
    var newGame = new Game();
    newGame.initialDeal();
    newGame.gameView.displayCards();
  });
};

$l(function() {
  $l(".deal-cards-button").on("click", function() {
    var newGame = new Game();
    newGame.initialDeal();
    newGame.gameView.displayCards();
  });
});
