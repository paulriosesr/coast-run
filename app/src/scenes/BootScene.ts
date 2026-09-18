import Phaser from 'phaser';

/** Palette from /game/palette.md — do not invent colors. */
const P = {
  sand: 0xf4e2c0,
  sandShadow: 0xc4a574,
  player: 0xd94f3d,
  enemy: 0x3a3a48,
  coin: 0xf2c14e,
  flag: 0xd94f3d,
} as const;

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    // Proto textures (asset-list.md): colored rects until Picasso sheets land.
    this.makeProto('proto_tile', 16, 16, P.sand);
    this.makeProto('proto_tile_fill', 16, 16, P.sandShadow);
    this.makeProto('proto_player', 32, 32, P.player);
    this.makeProto('proto_enemy', 32, 32, P.enemy);
    this.makeProto('proto_coin', 12, 12, P.coin);
    this.makeProto('proto_flag', 16, 32, P.flag);
  }

  create(): void {
    this.scene.start('Play');
  }

  private makeProto(key: string, w: number, h: number, color: number): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(color, 1);
    g.fillRect(0, 0, w, h);
    g.generateTexture(key, w, h);
    g.destroy();
  }
}
