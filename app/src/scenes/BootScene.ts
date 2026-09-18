import Phaser from 'phaser';
import { Hunters, Palette } from '../data/palette';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    (Object.keys(Hunters) as Array<keyof typeof Hunters>).forEach((id) => {
      this.makeProto(`hunter_${id}`, 48, 48, Hunters[id].color);
    });
    this.makeProto('proto_ground', 16, 16, Palette.asphalt);
    this.makeProto('proto_ground_top', 16, 16, Palette.outline);
    this.makeProto('proto_ghoul', 40, 40, Palette.ghoul);
    this.makeProto('proto_vamp', 40, 40, Palette.vampPale);
    this.makeProto('proto_wolf', 48, 32, Palette.wolfFur);
    this.makeProto('proto_captain', 48, 48, Palette.vampVein);
    this.makeProto('proto_broker', 64, 64, Palette.vampPale);
    this.makeProto('proto_canister', 16, 20, Palette.neonCyan);
    this.makeProto('proto_spike', 12, 20, Palette.neonMagenta);
  }

  create(): void {
    this.scene.start('Title');
  }

  private makeProto(key: string, w: number, h: number, color: number): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(Palette.outline, 1);
    g.fillRect(0, 0, w, h);
    g.fillStyle(color, 1);
    g.fillRect(1, 1, w - 2, h - 2);
    g.generateTexture(key, w, h);
    g.destroy();
  }
}
