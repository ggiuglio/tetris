import angular from 'angular';
  
  
  export const GameLoaderServiceModule = 
  angular.module('GameLoaderServiceModule', [])
  .service('gameLoaderService', gameLoaderService)
  .name

  function gameLoaderService () {

    var manifest = [
        {src: "upArrow.png", id: "up"},
        {src: "downArrow.png", id: "down"},
        {src: "leftArrow.png", id: "lwft"},
        {src: "rightArrow.png", id: "right"}
       //  {src: "sky.png", id: "sky"},
       //  {src: "ground.png", id: "ground"},
       //  {src: "hill1.png", id: "hill"},
       //  {src: "hill2.png", id: "hill2"}
    ];
    var loader = new createjs.LoadQueue(true);

    this.getResult = function (asset) {
        return loader.getResult(asset);
    };
    this.getLoader = function () {
        return loader;
    };
    this.loadAssets = function () {
        loader.loadManifest(manifest, true, "assets/images/");
    };



   this.getPiece = function () {
     var rand = Math.floor(Math.random() * 7) + 1
     switch (rand) {
       case 1:
         return this.getT();
         break;
       case 2:
         return this.getLRight();
         break;
       case 3:
         return this.getLLeft();
         break;
       case 4:
         return this.getI();
         break;
       case 5:
         return this.getSRight();
         break;
       case 6:
         return this.getSLeft();
         break;
       case 7:
         return this.getO();
         break;
     }
   };

   this.getT = function () {
     var piece = {
       shape: 'T',
       blocks: [
         {
           row: 0,
           col: 4
         },
         {
           row: 0,
           col: 5
         },
         {
           row: 0,
           col: 6
         },
         {
           row: 1,
           col: 5
         }
       ],
       center: {
         row: 0,
         col: 5
       },
       color: "grey"
     };

     return piece;
   };

   this.getLRight = function () {
     var piece = {
       shape: 'LLeft',
       blocks: [
         {
           row: 1,
           col: 4
         },
         {
           row: 1,
           col: 5
         },
         {
           row: 1,
           col: 6
         },
         {
           row: 0,
           col: 6
         }
       ],
       center: {
         row: 1,
         col: 5
       },
       color: "yellow"
     };

     return piece;
   };

   this.getLLeft = function () {
     var piece = {
       shape: 'LLeft',
       blocks: [
         {
           row: 1,
           col: 4
         },
         {
           row: 1,
           col: 5
         },
         {
           row: 1,
           col: 6
         },
         {
           row: 0,
           col: 4
         }
       ],
       center: {
         row: 1,
         col: 5
       },
        color: "green"
     };

     return piece;
   };

   this.getI = function () {
     var piece = {
       shape: 'I',
       blocks: [
         {
           row: 0,
           col: 5
         },
         {
           row: 1,
           col: 5
         },
         {
           row: 2,
           col: 5
         },
         {
           row: 3,
           col: 5
         }
       ],
       center: {
         row: 2,
         col: 5
       },
        color: "red"
     };

     return piece;
   };

   this.getSRight = function () {
     var piece = {
       shape: 'SRight',
       blocks: [
         {
           row: 1,
           col: 4
         },
         {
           row: 1,
           col: 5
         },
         {
           row: 0,
           col: 5
         },
         {
           row: 0,
           col: 6
         }
       ],
       center: {
         row: 0,
         col: 5
       },
        color: "brown"
     };

     return piece;
   };

   this.getSLeft = function () {
     var piece = {
       shape: 'SLeft',
       blocks: [
         {
           row: 0,
           col: 4
         },
         {
           row: 0,
           col: 5
         },
         {
           row: 1,
           col: 5
         },
         {
           row: 1,
           col: 6
         }
       ],
       center: {
         row: 0,
         col: 5
       },
         color: "violet"
     };

     return piece;
   };

   this.getO = function () {
     var piece = {
       shape: 'O',
       blocks: [
         {
           row: 0,
           col: 4
         },
         {
           row: 0,
           col: 5
         },
         {
           row: 1,
           col: 4
         },
         {
           row: 1,
           col: 5
         }

       ],
       center: {
         row: 0,
         col: 5
       },
       color: "blue"
     };

     return piece;
    };

  };


