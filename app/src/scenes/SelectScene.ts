import Phaser from 'phaser';
import { Hunters, HunterId, Palette } from '../data/palette';

const ORDER: HunterId[] = ['rex', 'nova', 'silas', 'vesper'];

export class SelectScene extends Phaser.Scene {
  private index = 0;
  private label!: Phaser.GameObjects.Text;
  private preview!: Phaser.GameObjects.Image;

  constructor() {
    super('Select');
  }

  create(): void {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, Palette.void);
    this.add
      .text(width / 2, 28, 'CHOOSE YOUR HUNTER', {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#EAF6C8',
      })
      .setOrigin(0.5);

    this.preview = this.add.image(width / 2, 120, 'hunter_rex').setScale(2);
    this.label = this.add
      .text(width / 2, 180, '', { fontFamily: 'monospace', fontSize: '14px', color: '#FFFFFF' })
      .setOrigin(0.5);
    this.add
      .text(width / 2, 220, '← → select   SPACE confirm', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#C8CCD8',
      })
      .setOrigin(0.5);

    this.refresh();
    const kb = this.input.keyboard;
    if (!kb) throw new Error('Keyboard unavailable');
    kb.on('keydown-LEFT', this.onLeft, this);
    kb.on('keydown-RIGHT', this.onRight, this);
    kb.on('keydown-A', this.onLeft, this);
    kb.on('keydown-D', this.onRight, this);
    kb.on('keydown-SPACE', this.onConfirm, this);
    kb.on('keydown-ENTER', this.onConfirm, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      kb.off('keydown-LEFT', this.onLeft, this);
      kb.off('keydown-RIGHT', this.onRight, this);
      kb.off('keydown-A', this.onLeft, this);
      kb.off('keydown-D', this.onRight, this);
      kb.off('keydown-SPACE', this.onConfirm, this);
      kb.off('keydown-ENTER', this.onConfirm, this);
    });
  }

  private onLeft = (): void => this.move(-1);
  private onRight = (): void => this.move(1);
  private onConfirm = (): void => this.confirm();

  private move(delta: number): void {
    this.index = (this.index + delta + ORDER.length) % ORDER.length;
    this.refresh();
  }

  private refresh(): void {
    const id = ORDER[this.index];
    this.preview.setTexture(`hunter_${id}`);
    this.label.setText(Hunters[id].name);
    const colors: Record<HunterId, string> = {
      rex: '#E8A030',
      nova: '#FF7A18',
      silas: '#5C8A4A',
      vesper: '#C41E4A',
    };
    this.label.setColor(colors[id]);
  }

  private confirm(): void {
    this.scene.start('Level1', { hunterId: ORDER[this.index] });
  }
}
