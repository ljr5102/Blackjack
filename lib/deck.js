var Deck = function() {
  this.cards = this.generateRandomDeck();
};

Deck.prototype.generateRandomDeck = function() {
  var suits = ["clubs", "diamonds", "hearts", "spades"];
  var values = ["ace", "two", "three", "four", "five",
                "six", "seven", "eight", "nine",
                "ten", "jack", "queen", "king"];
  var unshuffledDeck = [];
  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < values.length; j++) {
      var card = {
        suit: suits[i],
        value: values[j]
      };
      unshuffledDeck.push(card);
    }
  }
  var shuffledDeck = [];
  var randomIdx = [];
  while (shuffledDeck.length < 52) {
    var random = Math.floor(Math.random() * 52);
    if (randomIdx.indexOf(random) === -1) {
      shuffledDeck.push(unshuffledDeck[random]);
      randomIdx.push(random);
    }
  }
  return shuffledDeck;
};

Deck.prototype.dealFromTop = function() {
  return this.cards.shift();
};
