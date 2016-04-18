var Hand = function() {
  this.cardsInHand = [];
};

var Scoring = {
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  jack: 10,
  queen: 10,
  king: 10
};

Hand.prototype.addCardToHand = function(card) {
  this.cardsInHand.push(card);
};

Hand.prototype.busted = function() {
  return this.score() > 21;
};

Hand.prototype.score = function() {
  var score = 0;
  for(var i = 0; i < this.cardsInHand.length; i++) {
    var value = this.cardsInHand[i].value;
    if(value !== "ace") {
      score += Scoring[value];
    }
  }
  for (var j = 0; j < this.cardsInHand.length; j++) {
    var aces = this.cardsInHand[j].value;
    if(aces === "ace") {
      score += 11;
      if (score > 21) {
        score -= 10;
      }
    }
  }
  return score;
};

Hand.prototype.beats = function(otherHand) {
  if(otherHand.busted()) {
    return true;
  } else {
    return this.score() > otherHand.score();
  }
};
