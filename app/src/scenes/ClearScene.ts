import Phaser from 'phaser';
import { Palette } from '../data/palette';

export class ClearScene extends Phaser.Scene {
  constructor() {
    super('Clear');
  }

  create(): void {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, Palette.void);
    this.add
      .text(width / 2, 60, "HAVEN'S EDGE CLEAR", {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: '#00E5FF',
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, 100, 'Helix data-spike recovered.', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#EAF6C8',
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, 130, "UV grid countdown active.\nMap pin: Vein Markets.", {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#FF2BD6',
        align: 'center',
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, 180, 'LEVEL 2 LOCKED — SLICE COMPLETE', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#C8CCD8',
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, 230, 'SPACE → character select', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#A85A32',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-SPACE', () => this.scene.start('Select'));
  }
}
