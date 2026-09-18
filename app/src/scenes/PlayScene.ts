import Phaser from 'phaser';

const TILE = 16;
const PLAYER_W = 32;
const PLAYER_H = 32;
/** Hitbox narrower than 2-tile pits so lips can't be straddled (BUG-001). */
const BODY_W = 14;
const BODY_H = 28;
/** Enemy damage body ≈ full canvas so visible contact always kills (BUG-002). */
const ENEMY_BODY_W = 28;
const ENEMY_BODY_H = 28;
const MOVE_SPEED = 120;
const JUMP_VELOCITY = -320;
const ENEMY_SPEED = 40;

export class PlayScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private enemy!: Phaser.Physics.Arcade.Sprite;
  private coin!: Phaser.Physics.Arcade.Sprite;
  private flag!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: {
    a: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    w: Phaser.Input.Keyboard.Key;
    space: Phaser.Input.Keyboard.Key;
  };
  private ground!: Phaser.Physics.Arcade.StaticGroup;
  private enemyDir = 1;
  private enemyMinX = 0;
  private enemyMaxX = 0;
  private won = false;
  private hurtLock = false;

  constructor() {
    super('Play');
  }

  create(): void {
    this.won = false;
    this.hurtLock = false;
    const cols = 40;
    const floorRow = 9;
    const pitCols = new Set([12, 13, 22, 23]);

    this.ground = this.physics.add.staticGroup();

    for (let x = 0; x < cols; x++) {
      if (pitCols.has(x)) continue;
      const tx = x * TILE + TILE / 2;
      const ty = floorRow * TILE + TILE / 2;
      const top = this.ground.create(tx, ty, 'proto_tile') as Phaser.Physics.Arcade.Sprite;
      top.setOrigin(0.5, 0.5);
      top.refreshBody();

      const fill = this.ground.create(
        tx,
        (floorRow + 1) * TILE + TILE / 2,
        'proto_tile_fill',
      ) as Phaser.Physics.Arcade.Sprite;
      fill.setOrigin(0.5, 0.5);
      fill.refreshBody();
    }

    const floorY = floorRow * TILE;
    const spawnX = 3 * TILE + PLAYER_W / 2;
    const spawnY = floorY;
    this.player = this.physics.add.sprite(spawnX, spawnY, 'proto_player');
    this.player.setOrigin(0.5, 1);
    this.player.setCollideWorldBounds(false);
    this.player.setBounce(0);
    this.player.setSize(BODY_W, BODY_H);
    this.player.setOffset((PLAYER_W - BODY_W) / 2, PLAYER_H - BODY_H);
    this.player.setPosition(Math.round(spawnX), Math.round(spawnY));

    this.physics.add.collider(this.player, this.ground);

    // Walking enemy patrols between pits (cols 15–20).
    this.enemyMinX = 15 * TILE + 16;
    this.enemyMaxX = 20 * TILE + 16;
    const enemyX = 17 * TILE + 16;
    this.enemy = this.physics.add.sprite(enemyX, floorY, 'proto_enemy');
    this.enemy.setOrigin(0.5, 1);
    this.enemy.setBounce(0);
    this.enemy.setSize(ENEMY_BODY_W, ENEMY_BODY_H);
    this.enemy.setOffset((PLAYER_W - ENEMY_BODY_W) / 2, PLAYER_H - ENEMY_BODY_H);
    this.enemy.setImmovable(true);
    this.physics.add.collider(this.enemy, this.ground);
    this.physics.add.overlap(this.player, this.enemy, () => this.onEnemyHit());

    // Coin above ground after first pit.
    this.coin = this.physics.add.staticSprite(18 * TILE + 8, floorY - 24, 'proto_coin');
    this.coin.setOrigin(0.5, 0.5);
    this.coin.refreshBody();
    this.physics.add.overlap(this.player, this.coin, () => {
      if (this.coin.active) {
        this.coin.disableBody(true, true);
      }
    });

    // Flag at far end (win on touch).
    this.flag = this.physics.add.staticSprite(36 * TILE + 8, floorY, 'proto_flag');
    this.flag.setOrigin(0.5, 1);
    this.flag.refreshBody();
    this.physics.add.overlap(this.player, this.flag, () => this.onWin());

    const worldW = cols * TILE;
    const worldH = 180;
    this.physics.world.setBounds(0, 0, worldW, worldH + 64);
    this.cameras.main.setBounds(0, 0, worldW, worldH);
    this.cameras.main.startFollow(this.player, true, 1, 1);
    this.cameras.main.setRoundPixels(true);

    if (!this.input.keyboard) {
      throw new Error('Keyboard unavailable');
    }
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = {
      a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };
  }

  update(): void {
    if (this.won) {
      const body = this.player.body as Phaser.Physics.Arcade.Body;
      body.setVelocity(0, 0);
      return;
    }

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const left = this.cursors.left.isDown || this.keys.a.isDown;
    const right = this.cursors.right.isDown || this.keys.d.isDown;
    const jump =
      Phaser.Input.Keyboard.JustDown(this.keys.space) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.up!) ||
      Phaser.Input.Keyboard.JustDown(this.keys.w);

    if (left) {
      body.setVelocityX(-MOVE_SPEED);
    } else if (right) {
      body.setVelocityX(MOVE_SPEED);
    } else {
      body.setVelocityX(0);
    }

    if (jump && body.blocked.down) {
      body.setVelocityY(JUMP_VELOCITY);
    }

    const eBody = this.enemy.body as Phaser.Physics.Arcade.Body;
    if (this.enemy.x <= this.enemyMinX) {
      this.enemyDir = 1;
    } else if (this.enemy.x >= this.enemyMaxX) {
      this.enemyDir = -1;
    }
    eBody.setVelocityX(ENEMY_SPEED * this.enemyDir);
    this.enemy.x = Math.round(this.enemy.x);
    this.enemy.y = Math.round(this.enemy.y);

    this.player.x = Math.round(this.player.x);
    this.player.y = Math.round(this.player.y);

    const cam = this.cameras.main;
    cam.scrollX = Math.round(cam.scrollX);
    cam.scrollY = Math.round(cam.scrollY);

    if (this.player.y > 180 + 32) {
      this.respawn();
    }
  }

  private onEnemyHit(): void {
    if (this.won || this.hurtLock) return;
    this.hurtLock = true;
    this.respawn();
    // Brief lock so one overlap doesn't spam; cleared after teleport.
    this.time.delayedCall(200, () => {
      this.hurtLock = false;
    });
  }

  private onWin(): void {
    if (this.won) return;
    this.won = true;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0, 0);
    this.add
      .text(this.cameras.main.width / 2, 40, 'CLEAR', {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#E8F0F5',
      })
      .setScrollFactor(0)
      .setOrigin(0.5, 0.5);
  }

  private respawn(): void {
    if (this.won) return;
    const spawnX = 3 * TILE + PLAYER_W / 2;
    const spawnY = 9 * TILE;
    this.player.setPosition(Math.round(spawnX), Math.round(spawnY));
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0, 0);
  }
}
