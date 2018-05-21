import angular from 'angular';
import { AppModule } from './containers/app/app.module';
import { AppNavModule } from './components/app-nav/app-nav.module';
import { GameModule } from './components/game/game.module';
import { GameLoaderServiceModule } from './services/gameLoaderService'

const MODULE_NAME = 'main';
const MODULE_IMPORTS = [
  AppModule,
  AppNavModule,
  GameModule,
  GameLoaderServiceModule
];

export const AppMainModule = angular
  .module(MODULE_NAME, MODULE_IMPORTS)
  .name;
