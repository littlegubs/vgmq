import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { createNoise2D } from 'simplex-noise'
import { Circle } from './circle'
import { LobbyStore } from '../../../../core/store/lobby.store'

@Component({
  selector: 'app-lobby-visualizer',
  templateUrl: './visualizer.component.html',
})
export class VisualizerComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>
  audioContext: AudioContext
  analyser: AnalyserNode
  dataArray: Uint8Array
  bufferLength: number
  circles: Circle[] = []
  noise2D = createNoise2D()
  WIDTH: number
  HEIGHT: number
  nbParticles = 75

  constructor(private lobbyStore: LobbyStore) {}

  ngOnInit(): void {
    const canvas = this.canvasElement.nativeElement
    this.WIDTH = canvas.width = window.innerWidth
    this.HEIGHT = canvas.height = window.innerHeight

    this.circles = this.createCircles()

    this.lobbyStore.audioContext.subscribe((audioContext) => {
      this.audioContext = audioContext
    })
    this.lobbyStore.source.subscribe((source) => {
      if (source) {
        this.analyser = this.audioContext.createAnalyser()
        source.connect(this.analyser)
        this.analyser.connect(this.audioContext.destination)
        this.analyser.smoothingTimeConstant = 0.5
        this.analyser.maxDecibels = -10
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
        this.update()
      }
    })
  }

  createCircles(): Circle[] {
    return Array.from(
      { length: this.nbParticles },
      (_, index) => new Circle(index, this.noise2D, this.WIDTH, this.HEIGHT)
    )
  }

  update(): void {
    if (this.audioContext.state === 'running') {
      this.analyser.getByteFrequencyData(this.dataArray)
      this.background('rgb(20, 31, 42)')
      this.showCircles()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      requestAnimationFrame(this.update.bind(this))
    }
  }

  background(color: string): void {
    const ctx = this.canvasElement.nativeElement.getContext('2d')
    ctx.fillStyle = color
    ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT)
  }

  showCircles(): void {
    this.circles.forEach((circle) => {
      circle.update(this.dataArray)
      circle.draw(this.canvasElement.nativeElement.getContext('2d'))
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const canvas = this.canvasElement.nativeElement
    this.WIDTH = canvas.width = window.innerWidth
    this.HEIGHT = canvas.height = window.innerHeight
  }
}
