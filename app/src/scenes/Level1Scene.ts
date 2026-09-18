import Phaser from 'phaser';
import { Hunters, HunterId, Palette } from '../data/palette';

type LevelData = { hunterId: HunterId };

export class Level1Scene extends Phaser.Scene {
  private hunterId: HunterId = 'rex';
  private player!: Phaser.Physics.Arcade.Sprite;
  private ground!: Phaser.Physics.Arcade.StaticGroup;
  private enemies!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyA!: Phaser.Input.Keyboard.Key;
  private keyD!: Phaser.Input.Keyboard.Key;
  private keyW!: Phaser.Input.Keyboard.Key;
  private keyJ!: Phaser.Input.Keyboard.Key;
  private keyK!: Phaser.Input.Keyboard.Key;
  private keyL!: Phaser.Input.Keyboard.Key;
  private keyO!: Phaser.Input.Keyboard.Key;
  private keySpace!: Phaser.Input.Keyboard.Key;
  private hp = 100;
  private od = 0;
  private hpText!: Phaser.GameObjects.Text;
  private odText!: Phaser.GameObjects.Text;
  private phaseText!: Phaser.GameObjects.Text;
  private facing = 1;
  private canAttack = true;
  private invuln = false;
  private broker: Phaser.Physics.Arcade.Sprite | null = null;
  private brokerHp = 200;
  private stage = 0;
  private killed = 0;
  private won = false;
  private floorY = 220;

  constructor() {
    super('Level1');
  }

  init(data: LevelData): void {
    this.hunterId = data?.hunterId ?? 'rex';
  }

  create(): void {
    this.hp = 100;
    this.od = 0;
    this.stage = 0;
    this.killed = 0;
    this.won = false;
    this.broker = null;
    this.brokerHp = 200;
    this.canAttack = true;
    this.invuln = false;
    this.facing = 1;

    const worldW = 2800;
    this.add.rectangle(worldW / 2, 135, worldW, 270, Palette.void);
    this.add.rectangle(400, 36, 180, 3, Palette.neonMagenta).setScrollFactor(0.25);
    this.add.rectangle(1000, 44, 140, 3, Palette.neonCyan).setScrollFactor(0.25);

    this.ground = this.physics.add.staticGroup();
    for (let x = 0; x < worldW; x += 16) {
      const col = Math.floor(x / 16);
      if ((col >= 40 && col <= 44) || (col >= 80 && col <= 84)) continue;
      const top = this.ground.create(x + 8, this.floorY + 8, 'proto_ground_top') as Phaser.Physics.Arcade.Sprite;
      top.refreshBody();
      const fill = this.ground.create(x + 8, this.floorY + 24, 'proto_ground') as Phaser.Physics.Arcade.Sprite;
      fill.refreshBody();
    }

    const h = Hunters[this.hunterId];
    this.player = this.physics.add.sprite(80, this.floorY, `hunter_${this.hunterId}`);
    this.player.setOrigin(0.5, 1);
    this.player.setCollideWorldBounds(false);
    this.player.setSize(20, 40);
    this.player.setOffset(14, 8);
    this.player.setData('speed', h.speed);
    this.physics.add.collider(this.player, this.ground);

    this.enemies = this.physics.add.group();
    this.physics.add.collider(this.enemies, this.ground);
    this.physics.add.overlap(this.player, this.enemies, (_p, e) => {
      this.hurtPlayer(e as Phaser.Physics.Arcade.Sprite);
    });

    this.spawnEnemy('proto_ghoul', 300, 45, 45);
    this.spawnEnemy('proto_ghoul', 380, 45, 45);

    const can = this.physics.add.staticSprite(520, this.floorY - 10, 'proto_canister');
    can.refreshBody();
    this.physics.add.overlap(this.player, can, () => {
      if (can.active) {
        can.disableBody(true, true);
        this.od = Math.min(100, this.od + 40);
        this.refreshHud();
      }
    });

    this.physics.world.setBounds(0, 0, worldW, 320);
    this.cameras.main.setBounds(0, 0, worldW, 270);
    this.cameras.main.startFollow(this.player, true, 1, 1);
    this.cameras.main.setRoundPixels(true);

    this.hpText = this.add
      .text(8, 8, '', { fontFamily: 'monospace', fontSize: '12px', color: '#EAF6C8' })
      .setScrollFactor(0);
    this.odText = this.add
      .text(8, 24, '', { fontFamily: 'monospace', fontSize: '12px', color: '#00E5FF' })
      .setScrollFactor(0);
    this.phaseText = this.add
      .text(240, 8, 'ALLEY', { fontFamily: 'monospace', fontSize: '12px', color: '#FF2BD6' })
      .setScrollFactor(0)
      .setOrigin(0.5, 0);
    this.refreshHud();

    this.add.text(16, 150, 'A/D move · SPACE jump · J light · K heavy · L dash · O OD', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#C8CCD8',
    });

    if (!this.input.keyboard) throw new Error('Keyboard unavailable');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update(): void {
    if (this.won) return;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const speed = this.player.getData('speed') as number;
    const left = this.cursors.left.isDown || this.keyA.isDown;
    const right = this.cursors.right.isDown || this.keyD.isDown;
    const jump =
      Phaser.Input.Keyboard.JustDown(this.keySpace) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.up!) ||
      Phaser.Input.Keyboard.JustDown(this.keyW);

    if (left) {
      body.setVelocityX(-speed);
      this.facing = -1;
      this.player.setFlipX(true);
    } else if (right) {
      body.setVelocityX(speed);
      this.facing = 1;
      this.player.setFlipX(false);
    } else {
      body.setVelocityX(0);
    }

    if (jump && body.blocked.down) body.setVelocityY(-360);
    if (Phaser.Input.Keyboard.JustDown(this.keyL) && body.blocked.down) {
      body.setVelocityX(this.facing * speed * 2.2);
    }
    if (Phaser.Input.Keyboard.JustDown(this.keyJ)) this.doAttack(14);
    if (Phaser.Input.Keyboard.JustDown(this.keyK)) this.doAttack(24);
    if (Phaser.Input.Keyboard.JustDown(this.keyO) && this.od >= 100) this.doOverdrive();

    this.player.x = Math.round(this.player.x);
    this.player.y = Math.round(this.player.y);
    this.cameras.main.scrollX = Math.round(this.cameras.main.scrollX);

    if (this.player.y > 300) this.softDeath();

    this.enemies.children.each((obj) => {
      const e = obj as Phaser.Physics.Arcade.Sprite;
      if (!e.active) return true;
      const eb = e.body as Phaser.Physics.Arcade.Body;
      eb.setVelocityX((this.player.x < e.x ? -1 : 1) * (e.getData('speed') as number));
      e.x = Math.round(e.x);
      return true;
    });

    this.advanceStages();
  }

  private spawnEnemy(key: string, x: number, hp: number, speed: number): void {
    const e = this.enemies.create(x, this.floorY, key) as Phaser.Physics.Arcade.Sprite;
    e.setOrigin(0.5, 1);
    e.setData('hp', hp);
    e.setData('speed', speed);
    e.setSize(Math.max(16, e.width - 12), Math.max(20, e.height - 8));
  }

  private doAttack(dmg: number): void {
    if (!this.canAttack || this.won) return;
    this.canAttack = false;
    const hitX = this.player.x + this.facing * 28;
    const hitY = this.player.y - 24;
    const box = this.add.rectangle(hitX, hitY, 28, 28, Palette.neonCyan, 0.35);
    this.time.delayedCall(80, () => box.destroy());

    this.enemies.children.each((obj) => {
      const e = obj as Phaser.Physics.Arcade.Sprite;
      if (!e.active) return true;
      if (Phaser.Math.Distance.Between(hitX, hitY, e.x, e.y - e.height / 2) < 36) {
        const hp = (e.getData('hp') as number) - dmg;
        e.setData('hp', hp);
        this.od = Math.min(100, this.od + 8);
        this.refreshHud();
        if (hp <= 0) {
          e.destroy();
          this.killed += 1;
        }
      }
      return true;
    });

    if (this.broker?.active) {
      if (Phaser.Math.Distance.Between(hitX, hitY, this.broker.x, this.broker.y - 32) < 48) {
        this.brokerHp -= dmg;
        this.od = Math.min(100, this.od + 6);
        this.refreshHud();
        this.phaseText.setText(`BROKER ${Math.max(0, this.brokerHp)}`);
        if (this.brokerHp <= 0) this.win();
      }
    }

    this.time.delayedCall(180, () => {
      this.canAttack = true;
    });
  }

  private doOverdrive(): void {
    this.od = 0;
    this.refreshHud();
    const flash = this.add
      .rectangle(240, 135, 480, 270, Hunters[this.hunterId].color, 0.25)
      .setScrollFactor(0);
    this.time.delayedCall(120, () => flash.destroy());
    this.doAttack(40);
  }

  private hurtPlayer(_enemy: Phaser.Physics.Arcade.Sprite): void {
    if (this.invuln || this.won) return;
    this.invuln = true;
    this.hp -= 10;
    this.refreshHud();
    this.player.setTint(Palette.blood);
    (this.player.body as Phaser.Physics.Arcade.Body).setVelocity(-this.facing * 120, -120);
    this.time.delayedCall(500, () => {
      this.player.clearTint();
      this.invuln = false;
    });
    if (this.hp <= 0) this.scene.start('Select');
  }

  private softDeath(): void {
    this.hp -= 15;
    this.refreshHud();
    this.player.setPosition(80, 200);
    (this.player.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    if (this.hp <= 0) this.scene.start('Select');
  }

  private advanceStages(): void {
    if (this.stage === 0 && this.killed >= 2 && this.player.x > 560) {
      this.stage = 1;
      this.phaseText.setText('WAVE STREET');
      for (let i = 0; i < 3; i++) this.spawnEnemy('proto_vamp', 620 + i * 50, 55, 55);
      this.spawnEnemy('proto_wolf', 780, 28, 95);
      this.spawnEnemy('proto_wolf', 820, 28, 95);
    }
    if (this.stage === 1 && this.killed >= 7 && this.player.x > 1000) {
      this.stage = 2;
      this.phaseText.setText('BARRICADE');
      this.spawnEnemy('proto_captain', 1150, 130, 30);
      this.add
        .text(1150, 90, '"Inventory is late. Harvest them."', {
          fontFamily: 'monospace',
          fontSize: '10px',
          color: '#C8CCD8',
        })
        .setOrigin(0.5);
    }
    if (this.stage === 2 && this.killed >= 8 && this.player.x > 1500 && !this.broker) {
      this.stage = 3;
      this.phaseText.setText('PALE BROKER');
      this.broker = this.physics.add.sprite(1900, this.floorY, 'proto_broker');
      this.broker.setOrigin(0.5, 1);
      this.broker.setImmovable(true);
      this.physics.add.collider(this.broker, this.ground);
      this.physics.add.overlap(this.player, this.broker, () => {
        if (this.broker) this.hurtPlayer(this.broker);
      });
    }
    if (this.broker?.active) {
      const bb = this.broker.body as Phaser.Physics.Arcade.Body;
      bb.setVelocityX(this.player.x < this.broker.x ? -35 : 35);
      this.broker.x = Math.round(this.broker.x);
      if (this.brokerHp <= 100) this.broker.setTint(Palette.vampVein);
    }
  }

  private win(): void {
    if (this.won) return;
    this.won = true;
    this.broker?.destroy();
    this.broker = null;
    this.add.image(this.player.x + 24, this.floorY - 10, 'proto_spike').setOrigin(0.5, 1);
    this.time.delayedCall(900, () => this.scene.start('Clear'));
  }

  private refreshHud(): void {
    this.hpText.setText(`HP ${Math.max(0, this.hp)}`);
    this.odText.setText(`OD ${this.od}`);
  }
}
