/* eslint-disable */
/*

import { Button, GameLoop, Grid, init, initPointer, Sprite, Text, track } from 'kontra'
import './polyfills/roundrect'


interface ExSprite extends Sprite {
  id?: string
  _x?: number
  _y?: number
}

interface PolyfilledCanvasRenderingContext2D extends CanvasRenderingContext2D {
  roundRect: (x: number, y: number, w: number, h: number, radii: number[]) => void
}

class ParallaxBackground {
  private sprites: ExSprite[]
  private app: any
  public id = 'pxbg'
  // private speed: number

  constructor(image, app) {
    this.sprites = []
    this.app = app

    for (let index = 0; index < 2; index++) {
      this.sprites.push(Sprite({
        image,
        x: this.app.canvas.width,
        y: this.app.canvas.height / 2,
        opacity: 0.5,
        anchor: {
          x: 0,
          y: 0.5
        },
        _x: 0,
      }))
    }

    // this.speed = this.app.fps
  }

  update() {
    for (let index = 0; index < this.sprites.length; index++) {
      const sprite = this.sprites[index]

      if (sprite._x <= -sprite.width) {
        sprite._x = 0
      }

      sprite._x -= 3

      sprite.update()
    }
  }

  render() {
    for (let index = 0; index < this.sprites.length; index++) {
      const sprite = this.sprites[index]

      if (index === 1) sprite.x = sprite._x + sprite.width
      else sprite.x = sprite._x

      sprite.render()
    }
  }
}

class EmotesAnimation {
  private sprites: Array<ExSprite | ParallaxBackground | Grid> = []
  private loop: GameLoop
  private element: HTMLCanvasElement
  private context: PolyfilledCanvasRenderingContext2D
  private canvas: HTMLCanvasElement
  private fps: number

  private bg: HTMLImageElement
  private starBg: HTMLImageElement
  private sprite: HTMLImageElement

  private defaultTextOptions = (fontSize = 24, color = 'black') => {
    return {
      color,
      font: `${fontSize}px "Fira Sans", sans-serif`,
      onOver: () => {
        this.element.style.cursor = 'pointer'
      },
      onOut: () => {
        this.element.style.cursor = 'default'
      }
    }
  }

  constructor(element) {
    if (element instanceof HTMLCanvasElement) {
      this.element = element

      const { canvas, context } = init(this.element)

      this.context = context as any

      this.context.imageSmoothingEnabled = false

      initPointer({ canvas: this.element })

      this.canvas = canvas
      this.sprites = []
      this.fps = 30

      this.loop = GameLoop({
        fps: this.fps,
        update: () => this.update(),
        render: () => this.render(),
      })

      this.loop.start()

      this.bg = new Image(800, 600)
      this.bg.src = `${window.location.origin}/img/kontra/grid_bg.png`
      this.starBg = new Image(1333, 750)
      this.starBg.src = `${window.location.origin}/img/kontra/bg_02_h.png`

      const spriteBg = Sprite({
        image: this.bg
      })
      this.sprites.push(spriteBg)

      const spriteStarBg = new ParallaxBackground(this.starBg, this)
      this.sprites.push(spriteStarBg)
    } else if (element instanceof HTMLElement) {
      throw new Error('Tried to append a non canvas element to EmotesAnimation.')
    }
  }

  update() {
    for (let index = 0; index < this.sprites.length; index++) {
      const sprite = this.sprites[index]

      sprite.update()
    }
  }

  render() {
    for (let index = 0; index < this.sprites.length; index++) {
      const sprite = this.sprites[index]

      sprite.render()
    }
  }

  rollEmoteResult(image: { author: string, name: string, localUrl: string }) {
    this.clear('rollEmoteResult')

    this.sprite = new Image(256, 256)
    this.sprite.src = `${window.location.origin}/img/battle_emotes/${image.localUrl}`

    this.sprites.push(Sprite({
      image: this.sprite,
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      width: 256,
      height: 256,
      anchor: {
        x: 0.5,
        y: 0.5
      },
      id: 'rollEmoteResult'
    }))

    const button = Button({
      text: {
        text: 'Continue',
        anchor: { x: 0.5, y: 0.5 },
        ...this.defaultTextOptions()
      },
      anchor: { x: 0.5, y: 0.5 },
      padX: 10,
      padY: 10,
      color: 'whitesmoke',
      // render: () => {
      //   this.context.beginPath()
      //   this.context.roundRect(0,0,200,80,[5])
      //   this.context.fillStyle = 'white'
      //   this.context.fill()
      // },
      onDown: () => {
        this.clear('rollEmoteResult')
      },
    })

    this.sprites.push(Grid({
      x: this.canvas.width / 2,
      y: this.canvas.height - 100,
      align: 'center',
      justify: 'center',
      children: [button],
      anchor: {
        x: 0.5,
        y: 0.5
      },
      id: 'rollEmoteResult'
    }))

    track(button)
  }

  async showEmoteInventory () {
    this.clear('*')
    let grid = Grid({
      width: this.canvas.width,
      height: this.canvas.height,
      id: 'emoteInventory',
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      anchor: {
        x: 0.5,
        y: 0.5
      },
      // justify: 'start',
      // align: 'start',
      rowGap: 15,
      colGap: 15,
      flow: 'grid',
      numCols: 6,
    })

    const emotes = document.body.querySelectorAll('[data-emote-id]')
    for (let index = 0; index < emotes.length; index++) {
      const emote = emotes[index] as HTMLAnchorElement
      const emoteAmount = (emotes[index] as HTMLAnchorElement).querySelector('[data-amount]') as HTMLSpanElement
      const emoteName = (emoteAmount.nextElementSibling as HTMLSpanElement).innerText

      let emoteGrid = Grid({
        anchor: { x: 0.5, y: 0.5 },
        flow: 'column',
        justify: 'center',
        align: 'center',
        // rowGap: 15,
        // colGap: 15,
      })

      let button = Button({
        anchor: { x: 0.5, y: 0.5 },
        padX: 10,
        padY: 10,
        color: 'white',
      })

      const sprite = await this.loadImage(`https://static-cdn.jtvnw.net/emoticons/v2/${emote.dataset.emoteId}/default/light/2.0`)

      const { width, height } = this.fit(true)(button.width, button.height, sprite.naturalWidth, sprite.naturalHeight)

      sprite.width = width,
      sprite.height = height

      let text = Text({
        ...this.defaultTextOptions(14),
        text: `x${emoteAmount.dataset.amount} ${emoteName}`,
      })

      emoteGrid.children.push(Sprite({ image: sprite }))
      emoteGrid.children.push(text)

      button.width = text.width + 10
      button.height = text.height * 3
      button.children.push(emoteGrid)

      grid.children.push(button)
    }

    this.sprites.push(grid)
  }

  private clear(id: string) {
    for (let index = 0; index < this.sprites.length; index++) {
      const sprite = this.sprites[index]
      if (sprite.id === id || (typeof sprite.id === 'string' && id === '*' && sprite.id !== 'pxbg')) {
        this.sprites.splice(index, 1, null)
      }
    }

    this.sprites = this.sprites.filter(sprite => sprite !== null)
  }

  // https://stackoverflow.com/a/46399452 CC BY-SA 4.0
  private async loadImage (src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      let img = new Image(0, 0)
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  // (https://github.com/fregante/intrinsic-scale MIT License)
  // && (https://stackoverflow.com/a/45894506 CC BY-SA 3.0)
  private fit(contains) {
    return (parentWidth, parentHeight, childWidth, childHeight, scale = 1, offsetX = 0.5, offsetY = 0.5) => {
      const childRatio = childWidth / childHeight
      const parentRatio = parentWidth / parentHeight
      let width = parentWidth * scale
      let height = parentHeight * scale

      if (contains ? (childRatio > parentRatio) : (childRatio < parentRatio)) {
        height = width / childRatio
      } else {
        width = height * childRatio
      }

      return {
        width,
        height,
        offsetX: (parentWidth - width) * offsetX,
        offsetY: (parentHeight - height) * offsetY
      }
    }
  }
}

globalThis.emotesAnimation = new EmotesAnimation(document.getElementById('gameCanvas'))
*/
