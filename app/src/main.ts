import Phaser from 'phaser';
import { Palette } from './data/palette';
import { BootScene } from './scenes/BootScene';
import { TitleScene } from './scenes/TitleScene';
import { SelectScene } from './scenes/SelectScene';
import { Level1Scene } from './scenes/Level1Scene';
import { ClearScene } from './scenes/ClearScene';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 480,
  height: 270,
  backgroundColor: Palette.void,
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: { gravity: { x: 0, y: 900 }, debug: false },
  },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [BootScene, TitleScene, SelectScene, Level1Scene, ClearScene],
});
