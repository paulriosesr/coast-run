import Phaser from 'phaser';
import { Palette } from '../data/palette';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create(): void {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, Palette.void);
    this.add
      .text(width / 2, 70, 'BLOOD NEON', {
        fontFamily: 'monospace',
        fontSize: '28px',
        color: '#FF2BD6',
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, 100, 'LAST WATCH', {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: '#00E5FF',
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, 150, "Haven's Edge — Level 1 slice", {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#EAF6C8',
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, 210, 'Press SPACE / ENTER', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#C8CCD8',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-SPACE', () => this.scene.start('Select'));
    this.input.keyboard?.once('keydown-ENTER', () => this.scene.start('Select'));
  }
}
