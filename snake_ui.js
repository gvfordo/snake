(function (root) {
  var Snake = root.Snake = (root.Snake || {});

  var View = Snake.View = function(){
    this.$el = $('.container');
  };

  View.prototype.start = function(){
		this.board_size = [30, 20];
    this.board = new Snake.Board(this.board_size[0], this.board_size[1]);
    this.handleKeyEvent();
    var that = this;
    this.timerId = root.setInterval(that.step.bind(that), 50);
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
			 case 32:
				 if (that.timerId) {
					 root.clearInterval(that.timerId)
				 }
				 that.start()
				 break;
       case 37:
			 case 65:
			 
         that.board.snake.turn('W')
         break;
       case 38:
			 case 87:
         that.board.snake.turn('N')
         break;
       case 39:
			 case 68:
         that.board.snake.turn('E')
         break;
       case 40:
			 case 83:
         that.board.snake.turn('S')
         break;
       default:
      }
    });
  };

  View.prototype.displayGrid = function(grid) {
    var gridHTML = "";
    for (var i = 0; i < this.board_size[1]; i++) {
      for (var j = 0; j < this.board_size[0]; j++) {

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
