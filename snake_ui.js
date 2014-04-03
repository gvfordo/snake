(function (root) {
  var Snake = root.Snake = (root.Snake || {});

  var View = Snake.View = function(){
    this.$el = $('.container');
  };

  View.prototype.start = function(){
    this.boardSize = 40
    this.board = new Snake.Board(this.boardSize);
    this.handleKeyEvent();
    var that = this;
    this.timerId = root.setInterval(that.step.bind(that), 60);
    this.appleTimer = root.setInterval(that.board.makeApples.bind(that.board), 2000);
  };

  View.prototype.step = function() {
    var gameEnded = this.board.takeStep();
    var grid = this.board.render();
    if (gameEnded) {
      root.clearInterval(this.timerId);
      return;
    }
    this.displayGrid(grid);
    this.displayScore();
  };

  View.prototype.displayScore = function() {
    var currentScore = this.board.score;
    $('#scoreboard').html(currentScore);
  };

  View.prototype.handleKeyEvent = function(){
    // a bunch of jquery key bindings.
    var that = this;
    $(window).keydown(function(e){
      switch(e.keyCode){
       case 37:
         that.board.snake.turn('W')
         break;
       case 38:
         that.board.snake.turn('N')
         break;
       case 39:
         that.board.snake.turn('E')
         break;
       case 40:
         that.board.snake.turn('S')
         break;
       default:
      }
    });
  };

  View.prototype.displayGrid = function(grid) {
    var gridHTML = "";
    for (var i = 0; i < this.boardSize; i++) {
      for (var j = 0; j < this.boardSize; j++) {

        if (grid[i][j] === "O"){
          gridHTML += "<div data-x='"+j+"' data-y='"+i+"' class='cell snake-head' ></div>"
        } else if (grid[i][j] === "S") {
          gridHTML += "<div data-x='"+j+"' data-y='"+i+"' class='cell snake' ></div>"
        } else if (grid[i][j] === "a") {
          gridHTML += "<div data-x='"+j+"' data-y='"+i+"' class='cell apple' ></div>"
        } else {
          gridHTML += "<div data-x='"+j+"' data-y='"+i+"' class='cell' ></div>"
        }
      }
      gridHTML += "<div class='clear-div'></div>"
    }
    $grid = $('.container');
    $grid.empty();
    $grid.html(gridHTML);
  };


})(this);

game = new this.Snake.View;
game.start();
