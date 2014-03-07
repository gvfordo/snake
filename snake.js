(function(root){

  var Snake = root.Snake = (root.Snake || {});



  var theSnake = Snake.theSnake = function (start) {
    this.dir = "N";
    this.segments = [];
    this.head = start;
    this.grow = 0;
  };

  theSnake.DIRECTIONS = {
    "E": [ 0,  1],
    "W": [ 0, -1],
    "S": [ 1,  0],
    "N": [-1,  0]
  }

  theSnake.prototype.move = function() {
    var oldHead = this.head.slice(0)
    var vector = theSnake.DIRECTIONS[this.dir];
    var segments = this.segments
    this.head[0] += vector[0];
    this.head[1] += vector[1];
    this.segments.unshift(oldHead);
    if (this.grow){
      this.grow -= 1;
    } else {
      this.segments.pop();
    }
  };

  theSnake.prototype.turn = function(dir) {
    this.dir = dir;
  };


})(this);



(function(root){

  var Snake = root.Snake = (root.Snake || {});

  var Coord = Snake.Coord = function (coord) {
    this.coord = cord
  };

  Coord.prototype.plus = function(vector) {
    // this.coord plus a vector
  };


})(this);



(function(root){

  var Snake = root.Snake = (root.Snake || {});

  var Board = Snake.Board = function (num) {
    var start = [Math.floor(num / 2), Math.floor(num / 2)]
    this.snake = new Snake.theSnake(start);
    this.apples = [];
    this.grid = this.createGrid(num);
    this.max = num;
    this.score = 0;
  };

  Board.prototype.ateApple = function() {
    var head = this.snake.head;
    var apples = this.apples;
    for(var x = 0; x < apples.length; x++){
      if (apples[x][0] === head[0] && apples[x][1] === head[1]) {
        return x;
      }
    }
    return false;
  }

  Board.prototype.createGrid = function(num) {
    var grid = [];
    for(var i = 0; i < num; i++){
      grid[i] = [];
      for(var j = 0; j < num; j++){
        grid[i][j] = " . ";
      }
    }
    return grid;
  };

  Board.prototype.takeStep = function() {
    this.snake.move();
    if (this.hasDied()) {
      return true;
    }
    var apple = this.ateApple();
    if(apple !== false){
      this.score += 1;
      this.snake.grow += 3;
      this.apples.splice(apple, 1);
    }
    return false;
  }

  Board.prototype.hasDied = function() {
    return (!(this.inBounds()) || this.Canibal())
  };

  Board.prototype.inBounds = function() {
    var head = this.snake.head;
    return (head[0] >= 0 && head[0] < this.max &&
                 head[1] >= 0 && head[1] < this.max);
  };

  Board.prototype.Canibal = function(){
    var segments = this.snake.segments;
    var head = this.snake.head;
    for(var i = 0; i < segments.length; i++) {
      if ((head[0] === segments[i][0]) && (head[1] === segments[i][1])) {
        return true;
      }
    }
    return false;
  };

  Board.prototype.makeApples = function(){
    if (this.apples.length === 0) {
      while (this.apples.length < 3) {
        var randX = Math.floor(Math.random()*this.max);
        var randY = Math.floor(Math.random()*this.max);
        var snake = this.snake.segments.concat(this.snake.head);
        var goodApple = true;
        for(var i = 0; i < snake.length; i++){
          if (snake[i][0] === randX && snake[i][1] === randY) {
            goodApple = false;
          }
        }
        for(var i = 0; i < this.apples.length; i++){
          if (this.apples[i][0] === randX && this.apples[i][1] === randY) {
            goodApple = false;
          }
        }
        if (goodApple) {
          this.apples.push([randX, randY]);
        }
      }
    }
  }

  Board.prototype.render = function() {
    var that = this;
    var gridRender = []
    this.grid.forEach( function(row, i) {
      gridRender[i] = []
      row.forEach( function(col, j) {
        var object = that.notEmpty(i, j);
        if (object) {
          gridRender[i][j] = object;
        } else {
          gridRender[i][j] = "."
        }
      });
    });
    return gridRender;
  };

  Board.prototype.notEmpty = function(i, j) {
    var head = this.snake.head;
    var segments = this.snake.segments;
    var apples = this.apples;
    if (head[0] === i && head[1] === j) {
      return 'O';
    }
    for(var x = 0; x < segments.length; x++) {
     if (segments[x][0] === i && segments[x][1] === j) {
       return 'S';
     }
    }
    for(var x = 0; x < apples.length; x++) {
     if (apples[x][0] === i && apples[x][1] === j) {
       return 'a';
     }
    }
    return false;
  };


})(this);


