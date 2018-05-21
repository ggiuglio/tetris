export const GameComponent = {
 
    template: `
    <div class="game">
        <div class="gameStage">
            <div class="numberContainer">
            <div class="score">Score: {{$ctrl.gameScore}}</div>
            <div class="level">Level: {{$ctrl.level}}</div>
            </div>

            <game-canvas gwidth="$ctrl.gameWidth" gheight="$ctrl.gameHeight" game-score="$ctrl.gameScore" status="$ctrl.status" 
            level="$ctrl.level"> 
            </game-canvas>

            <div class="gameover" ng-class="$ctrl.vievw" ng-if="$ctrl.status == 'gameover'" ng-click="$ctrl.start()">
                GAME OVER
                <div>Score: {{$ctrl.gameScore}} </div>
            </div>

            <div class="gameControll" ng-if="$ctrl.status != 'playing'" ng-click="$ctrl.start()">
                PLAY
            </div>


            <!-- <div class="firstRowButtons">
            <div class="upArrow" class="downArrow" ng-mouseDown="game.clickButton('$ctrl.rotateLeft')">
                <img src="/assets/images/upArrow.png" />
            </div>
            </div>
            <div class="secondRowButtons">
            <div class="leftArrow" ng-mouseDown="game.clickButton('left')">
                <img src="/assets/images/leftArrow.png" />
            </div>

            <div class="downArrow" ng-mouseDown="game.clickButton('rotateLeft')">
                <img src="/assets/images/downArrow.png" />
            </div>

            <div class="rightArrow" ng-mouseDown="game.clickButton('right')">
                <img src="/assets/images/rightArrow.png" />
            </div>
            </div> -->
        </div>
    </div>
    `,
    controller: class GameComponent {
      constructor(EventEmmiter, $window, $rootScope) {
        'ngInject';
        this.root = $rootScope;
  
        this.EventEmmiter = EventEmmiter;

    
        if ($window.innerWidth > 760) {
            this.gameHeight = 580;
            this.gameWidth = 206;
            this.vievw = "desktop";
        } else {
            this.gameWidth = $window.innerWidth;
            this.gameHeight =  $window.innerHeight;
            this.vievw = "mobile";
        }

        this.gameScore = 0;
        this.status = "paused";
        this.level = 5;
        }

        start(dir) {
            if(this.status == "gameover") {
                this.root.$emit('resetGame', dir);
            }
            this.status = "playing";
        };
      }
  };
  