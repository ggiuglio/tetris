import angular from 'angular';
// app
import { gameCanvasDirective } from './gameCanvas';
import { GameComponent } from './game.component'
import './game.component.scss';

const MODULE_NAME = 'game.module';
const COMPONENT_NAME = 'game'
const MODULE_IMPORTS = [];

export const GameModule = angular
  .module(MODULE_NAME, MODULE_IMPORTS)
  .component(COMPONENT_NAME, GameComponent)
  .directive('gameCanvas', ['gameLoaderService', gameCanvasDirective])
  .name
