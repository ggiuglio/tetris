
  export const gameCanvasDirective = function (gameLoaderService) {
       return {
         restrict: 'E',
         replace: true,
         scope : {
           gwidth: '=gwidth',
           gheight: '=gheight',
           gameScore: '=gameScore',
           status: '=status',
           level: '=level'
         },
         template: "<canvas class='gameCanvas' width='200' height='200'></canvas>",
         link: function (scope, element) {

             var w, h, newPiece, onHold, baseline, maxBaseline, upArrow, leftArrow, downArrow, rightArrow,
             speed, deltaS, blocksOnTheGround, blocksOnTheGroundContainer, speedTable, checking;
             onHold = false;
             checking = false;
             deltaS = 0;
             speedTable = [50, 46, 42, 38, 34, 31, 28, 25, 23, 21, 19, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8];

             scope.level = 1;
             speed = speedTable[scope.level - 1] * 5;

             blocksOnTheGround = [];
             for (var i = 0; i < 23; i++) {
               var row = [];
               for (var j = 0; j < 10; j++) {
                 row[j] = null;
               }
               row[10] = 0;

               blocksOnTheGround[i] = row;
             }

             element[0].width = scope.gwidth;
             element[0].height = scope.gheight;
             w = scope.gwidth;
             h = scope.gheight;

             scope.$root.$on('resetGame', function($event, dir) {
              resetGame();
             });

            drawGame();

             function drawGame() {
                 //drawing the game canvas from scratch here
               if (scope.stage) {
                   scope.stage.autoClear = true;
                   scope.stage.removeAllChildren();
                   scope.stage.update();
               } else {
                   scope.stage = new createjs.Stage(element[0]);
               }
               gameLoaderService.getLoader().addEventListener("complete", handleComplete);
               gameLoaderService.loadAssets();
             };

             function handleComplete () {
               var playgroundBorder = new createjs.Shape();
               playgroundBorder.graphics.beginStroke("#000");
               playgroundBorder.graphics.setStrokeStyle(1);
               playgroundBorder.snapToPixel = true;
               playgroundBorder.graphics.drawRect(0, 0, 200, 460);
               playgroundBorder.x = 0;
               playgroundBorder.y = 0;

               scope.stage.addChild(playgroundBorder);

               blocksOnTheGroundContainer = new createjs.Container();
               blocksOnTheGroundContainer.setBounds(0, 0, 80, 80);
               blocksOnTheGroundContainer.x = 0;
               blocksOnTheGroundContainer.y = 0;
               scope.stage.addChild(blocksOnTheGroundContainer);

               loadNewPiece();
               loadControls();

               document.addEventListener("keydown", keyEvent);
               document.addEventListener("keyup", keyUpEvent);
               createjs.Touch.enable(scope.stage);
               createjs.Ticker.timingMode = createjs.Ticker.RAF;
               createjs.Ticker.addEventListener("tick", tick);
               scope.stage.update();
             };

             function loadControls() {
               upArrow = new createjs.Bitmap("./assets/images/upArrow.png");
               upArrow.name = "upArrow";
               upArrow.x = 79;
               upArrow.y = 465;
               upArrow.width = 142;
               upArrow.height = 142;
               upArrow.scaleX = 0.3;
               upArrow.scaleY = 0.3;

               leftArrow = new createjs.Bitmap("./assets/images/leftArrow.png");
               leftArrow.name = "leftArrow";
               leftArrow.x = 10;
               leftArrow.y = 512;
               leftArrow.width = 142;
               leftArrow.height = 142;
               leftArrow.scaleX = 0.3;
               leftArrow.scaleY = 0.3;

               downArrow = new createjs.Bitmap("./assets/images/downArrow.png");
               downArrow.name = "downArrow";
               downArrow.x = 79;
               downArrow.y = 512;
               downArrow.width = 142;
               downArrow.height = 142;
               downArrow.scaleX = 0.3;
               downArrow.scaleY = 0.3;

               rightArrow = new createjs.Bitmap("./assets/images/rightArrow.png");
               rightArrow.name = "rightArrow";
               rightArrow.x = 148;
               rightArrow.y = 512;
               rightArrow.width = 142;
               rightArrow.height = 142;
               rightArrow.scaleX = 0.3;
               rightArrow.scaleY = 0.3;


               scope.stage.addChild(upArrow);
               scope.stage.addChild(leftArrow);
               scope.stage.addChild(downArrow);
               scope.stage.addChild(rightArrow);

               upArrow.on("mousedown", mouseEvent);
               leftArrow.on("mousedown", mouseEvent);
               downArrow.on("mousedown", mouseEvent);
               scope.stage.on("stagemouseup", mouseUpEvent);
               rightArrow.on("mousedown", mouseEvent);
             };

             function loadNewPiece() {
               newPiece = gameLoaderService.getPiece();
               newPiece.container = new createjs.Container();
               newPiece.container.setBounds(0, 0, 80, 80);

               for (var i = 0; i < 4; i++) {
                 newPiece.blocks[i].border = new createjs.Shape();
                 newPiece.blocks[i].border.graphics.beginStroke("#000");
                 newPiece.blocks[i].border.graphics.setStrokeStyle(1);
                 newPiece.blocks[i].border.snapToPixel = true;
                 newPiece.blocks[i].border.graphics.drawRect(0, 0, 20, 20);
                 newPiece.blocks[i].border.x = newPiece.blocks[i].col * 20;
                 newPiece.blocks[i].border.y = newPiece.blocks[i].row * 20;

                 newPiece.blocks[i].fill = new createjs.Shape();
                 newPiece.blocks[i].fill.graphics.beginFill(newPiece.color);
                 newPiece.blocks[i].fill.graphics.drawRect(0, 0, 20, 20);
                 newPiece.blocks[i].fill.graphics.endFill();
                 newPiece.blocks[i].fill.x = newPiece.blocks[i].col * 20;
                 newPiece.blocks[i].fill.y = newPiece.blocks[i].row * 20;

                 newPiece.container.addChild(newPiece.blocks[i].fill);
                 newPiece.container.addChild(newPiece.blocks[i].border);
               }
              newPiece.container.x = newPiece.center.col * 20 + 10;
              newPiece.container.y = newPiece.center.row * 20 + 10;
              newPiece.container.regX = newPiece.center.col * 20 + 10;
              newPiece.container.regY = newPiece.center.row * 20 + 10;
              scope.stage.addChild(newPiece.container);
              };

             function keyEvent(e) {
                 var code = e.keyCode;
                 switch (code) {
                     case 37: move("left"); break;
                     case 38: move("rotateLeft"); break;
                     case 39: move("right"); break;
                     case 40: extraSpeedStart(); break;
                 }
             };

             function keyUpEvent(e) {
              var code = e.keyCode;
              console.log('kez', code)
              switch (code) {
                  case 40: extraSpeedStop(); break;
              }
          };

             function mouseEvent(e) {
               switch (e.target.name) {
                   case "leftArrow": move("left"); break;
                   case "upArrow": move("rotateLeft"); break;
                   case "rightArrow": move("right"); break;
                   case "downArrow": extraSpeedStart(); break;
               }
             };

             function mouseUpEvent(e) {
                extraSpeedStop();
            };

             function moveDown() {
                 var move = calculateMove('down');
                 var hit = (hitTheGround(move) || hitPiece(move));
                 if (hit) {
                    checkGameOver();
                    if(scope.status == "playing") {
                      immobilize();
                      checking = true;
                      removeFullLines();
                      loadNewPiece();
                      checking = false;
                      setPointsForPiece();
                    }
                 } else {
                   applyMove(move);
                   startMoveAnimation("down", true);
                 }
             };

             function move (direction) {
               if (!onHold && !checking) {
                 onHold = true;
                 var move = calculateMove(direction);
                 var canMove = checkMove(move);
                 if (canMove) {
                   applyMove(move);
                   startMoveAnimation(direction);
                 } else {
                   onHold = false;
                 }
               }
             };

             function calculateMove (direction) {
               var move = {
                 center: {
                   row: newPiece.center.row,
                   col: newPiece.center.col
                 },
                 positions: []
               };
               for (var i = 0; i < 4; i++) {
                 var position = {
                   col: newPiece.blocks[i].col,
                   row: newPiece.blocks[i].row
                 };
                 switch (direction) {
                   case "right":
                     position.col = newPiece.blocks[i].col + 1;
                     break;
                   case "left":
                       position.col = newPiece.blocks[i].col - 1;
                       break;
                   case "down":
                       position.row = newPiece.blocks[i].row + 1;
                       break;
                   case "rotateLeft":
                       position.col = newPiece.blocks[i].row + 1;
                       var rowDif = newPiece.blocks[i].row - move.center.row;
                       var colDif = newPiece.blocks[i].col - move.center.col;

                       position.col = rowDif + newPiece.center.col;
                       position.row = -colDif + newPiece.center.row;
                       break;
                 };
                 move.positions.push(position);
               }
               switch (direction) {
                 case "right":
                   move.center.col++;
                   break;
                 case "left":
                     move.center.col--;
                     break;
                 case "down":
                     move.center.row++;
                     break;
               }

               return move;
             };

             function checkMove (move) {
               for (var i = 0; i < 4; i++) {
                 if (move.positions[i].col < 0 || move.positions[i].col >= 10 ||hitPiece(move) ) {
                   return false;
                 }
               }
               return true;
             };

             function hitTheGround(move) {
               for (var i = 0; i < 4; i++) {
                 if (move.positions[i].row > 22) {
                   return true;
                 }
               }
               return false;
             };

             function hitPiece(move) {
               for (var i = 0; i < 4; i++) {
                 if (blockHitBlock(move.positions[i])) {
                   return true;
                 }
               }
               return false;
             };

             function blockHitBlock(block) {
               if (block.row >= 0 && blocksOnTheGround[block.row][block.col] != null) {
                 return true;
               } else {
                 return false;
               }
             };

             function immobilize() {
               for (var i = 0; i < 4; i++) {
                 var blockDown = {
                   col: newPiece.blocks[i].col,
                   row: newPiece.blocks[i].row,
                   graph: newPiece.blocks[i]
                 };

                 blocksOnTheGroundContainer.addChild(blockDown.graph.fill);
                 blocksOnTheGroundContainer.addChild(blockDown.graph.border);

                 blockDown.graph.fill.x = blockDown.col * 20;
                 blockDown.graph.fill.y = blockDown.row * 20;
                 blockDown.graph.border.x = blockDown.col * 20;
                 blockDown.graph.border.y = blockDown.row * 20;

                 blocksOnTheGround[blockDown.row][blockDown.col] = blockDown;
                 blocksOnTheGround[blockDown.row][10]++;
               }
                scope.stage.removeChild(newPiece.container);
             };

             function removeFullLines() {
               var rowsToDelete = [];
               for (var i = 22; i >= 0; i--) {
                 if(blocksOnTheGround[i][10] == 10) {
                   rowsToDelete.push(i)
                 };
               };

               for (var i = 0; i < rowsToDelete.length; i++) {
                  checking = true;
                  deleteRow(rowsToDelete[i] + i);
               }

               if (rowsToDelete.length > 0) {
                 updateBlockOnGroundPositions();
                 levelUp();
                 setPointsForcleanedLine(rowsToDelete.length);
                 checking = false;
               }

             };

             function updateBlockOnGroundPositions () {
               for (var i = 0; i < 23; i++) {
                 for (var j = 0; j < 10; j++) {
                   if (blocksOnTheGround[i][j] != null) {
                     createjs.Tween.get(blocksOnTheGround[i][j].graph.fill).to({y: blocksOnTheGround[i][j].row * 20}, 60);
                     createjs.Tween.get(blocksOnTheGround[i][j].graph.border).to({y: blocksOnTheGround[i][j].row * 20}, 60);
                   }
                 }
               }
             }

             function deleteRow(rowToDelete) {
               for (var j = 0; j < 10; j++) {
                  blocksOnTheGround[rowToDelete][j]
                   blocksOnTheGroundContainer.removeChild(blocksOnTheGround[rowToDelete][j] .graph.fill);
                   blocksOnTheGroundContainer.removeChild(blocksOnTheGround[rowToDelete][j] .graph.border);
               }

               for (var j = 0; j < rowToDelete; j++) {
                 for(var i = 0; i < 10; i++) {
                   if (blocksOnTheGround[j][i] != null) {
                    blocksOnTheGround[j][i].row++
                  }
                }
               }

               blocksOnTheGround.splice(rowToDelete, 1);
               var newRow = [];

               for (var j = 0; j < 10; j++) {
                 newRow[j] = null;
               }
               newRow[10] = 0;

               blocksOnTheGround.unshift(newRow);
             };

             function applyMove (move) {
               for (var i = 0; i < 4; i++) {
                 newPiece.blocks[i].col = move.positions[i].col;
                 newPiece.blocks[i].row = move.positions[i].row;
               }
               newPiece.center.row = move.center.row;
               newPiece.center.col = move.center.col;
             };

             function startMoveAnimation (direction) {
               switch (direction) {
                case "right":
                    createjs.Tween.get(newPiece.container).to({x: newPiece.container.x + 20}, 20).call(function () {
                        onHold = false;
                    });
                    break;
                case "left":
                     createjs.Tween.get(newPiece.container).to({x: newPiece.container.x - 20}, 20).call(function () {
                         onHold = false;
                     });
                     break;
                case "down":
                    createjs.Tween.get(newPiece.container).to({y: newPiece.container.y + 20}, 20).call(function () {
                        onHold = false;
                    });
                    break;
                case "rotateLeft":
                   var rotation = direction == "right" ? newPiece.container.rotation + 90 : newPiece.container.rotation - 90;
                   createjs.Tween.get(newPiece.container).to({rotation: rotation}, 100).call(function () {
                       onHold = false;
                   });
                   break;
               };
             };

             function tick(event) {
               if (scope.status == "playing" && !checking) {
                  deltaS += event.delta;
                  if (deltaS >= speed) {
                    deltaS = 0;
                    moveDown();
                  }
                  scope.stage.update(event);
               }
             }

             function levelUp() {
               if(scope.level <= 20) {
                 scope.level++;
                 speed = speedTable[scope.level - 1] * 5;
                 scope.$root.$apply();
               }
             }

             function checkGameOver() {
               if (newPiece.blocks[0].row == 0 ||
                   newPiece.blocks[1].row == 0 ||
                   newPiece.blocks[2].row == 0 ||
                   newPiece.blocks[3].row == 0) {
                   scope.status = "gameover";
                   scope.$root.$apply();
               }
             }

             function setPointsForPiece() {
               scope.gameScore = scope.gameScore + 10;
               scope.$root.$apply();
             }

             function setPointsForcleanedLine(lines) {
               scope.gameScore += 100 * lines;
               scope.$root.$apply();
             }

             function resetGame() {
               deltaS = 0;
               scope.level = 1;
               speed = speedTable[scope.level - 1] * 5;
               scope.gameScore = 0;
               blocksOnTheGround = [];
               for (var i = 0; i < 23; i++) {
                 var row = [];
                 for (var j = 0; j < 10; j++) {
                   row[j] = null;
                 }
                 row[10] = 0;

                 blocksOnTheGround[i] = row;
               }
               blocksOnTheGroundContainer.removeAllChildren();
             }

             function extraSpeedStart() {
               console.log('extraspeed');
              speed = 20; 
             }

             function extraSpeedStop() {
               console.log('up');
              speed = speedTable[scope.level - 1] * 5;
             }
         }
       };
      }

