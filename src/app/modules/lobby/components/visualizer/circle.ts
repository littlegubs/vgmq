import { NoiseFunction2D } from 'simplex-noise'

export class Circle {
  cachedValue = 0
  value = 0
  xC = 0
  yC = 0
  x = 0
  y = 0
  p = 0
  i = 0
  rgb = this.getColor()

  constructor(private index: number, private noise2D: NoiseFunction2D, private WIDTH: number, private HEIGHT: number) {}

  update(dataArray: Uint8Array): void {
    this.cachedValue = this.value
    this.value = dataArray[this.index]
    if (this.value !== this.cachedValue) {
      this.xC = this.WIDTH / 2 + Math.cos(this.index + this.i) * this.value * 2.4
      this.yC = this.HEIGHT / 2 + Math.sin(this.index + this.i) * this.value * 2.4
      this.p = (210 - this.value) * 0.5

      this.y = this.noise2D(this.index, this.i) * this.p + this.yC
      this.x = this.noise2D(this.index, this.i) * this.p + this.xC

      this.i += 0.01
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = this.rgb
    ctx.translate(this.x, this.y)
    ctx.arc(0, 0, this.value * 0.1, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  private getColor(): string {
    const colors = ['rgb(255, 255, 255)', 'rgb(255, 209, 48)', 'rgb(124, 248, 156)']

    return colors[Math.floor(Math.random() * colors.length)]
  }
}
