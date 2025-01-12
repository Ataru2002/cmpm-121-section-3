import * as Phaser from "phaser";

import starfieldUrl from "/assets/starfield.png";

export default class Play extends Phaser.Scene {
  fire?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;

  starfield?: Phaser.GameObjects.TileSprite;
  spinner?: Phaser.GameObjects.Shape;
  enemy?: Phaser.GameObjects.Shape;
  enemy2?: Phaser.GameObjects.Shape;

  rotationSpeed = Phaser.Math.PI2 / 1000; // radians per millisecond

  isFire?: boolean;

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("starfield", starfieldUrl);
  }

  #addKey(
    name: keyof typeof Phaser.Input.Keyboard.KeyCodes,
  ): Phaser.Input.Keyboard.Key {
    return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
  }

  create() {
    this.fire = this.#addKey("F");
    this.left = this.#addKey("LEFT");
    this.right = this.#addKey("RIGHT");

    const starter = 0;
    this.starfield = this.add
      .tileSprite(
        starter,
        starter,
        this.game.config.width as number,
        this.game.config.height as number,
        "starfield",
      )
      .setOrigin(starter, starter);

    const color = 0xff0000;
    const width = 50;
    const height = 50;
    const x = (this.game.config.width as number) - width;
    const y = (this.game.config.height as number) - height;
    this.spinner = this.add
      .rectangle(x, y, width, height, color)
      .setOrigin(starter, starter);

    const colore = 0x63264a;
    const widthe = 50;
    const heighte = 50;
    const xe = (this.game.config.width as number) - width;
    const ye = 0;
    this.enemy = this.add
      .rectangle(xe, ye, widthe, heighte, colore)
      .setOrigin(starter, starter);
  }

  update(_timeMs: number, delta: number) {
    const transform = 4;
    this.starfield!.tilePositionX -= transform;

    if (this.isFire) {
      this.spinner!.y -= 1;
    } else {
      if (this.left!.isDown) {
        this.spinner!.x -= delta;
      }
      if (this.right!.isDown) {
        this.spinner!.x += delta;
      }
    }

    this.enemy!.x -= 1;
    this.spawn();
    this.spawne();

    if (this.fire!.isDown) {
      const leftBound = 1.5;
      const rightBound = 1;
      const timer = 300;
      this.isFire = true;
      this.tweens.add({
        targets: this.spinner,
        scale: { from: leftBound, to: rightBound },
        duration: timer,
        ease: Phaser.Math.Easing.Sine.Out,
      });
    }
  }

  spawn() {
    if (this.spinner!.y <= 0) {
      this.isFire = false;
      this.spinner!.y =
        (this.game.config.height as number) - this.spinner!.height;
    }
  }
  spawne() {
    if (this.enemy!.x <= 0) {
      this.enemy!.x = (this.game.config.width as number) - this.enemy!.width;
    }
  }
}
