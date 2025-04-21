import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { createNoise2D } from 'simplex-noise'
import { Circle } from './circle'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LocalStorageHelper } from '../../../../core/helpers/local-storage-helper'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-lobby-visualizer',
  templateUrl: './visualizer.component.html',
  standalone: false,
})
export class VisualizerComponent implements OnInit, OnDestroy {
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
  sourceSub: Subscription
  audioContextSub: Subscription

  constructor(private lobbyStore: LobbyStore, private localStorageHelper: LocalStorageHelper) {}

  ngOnInit(): void {
    const canvas = this.canvasElement.nativeElement
    this.WIDTH = canvas.width = window.innerWidth
    this.HEIGHT = canvas.height = window.innerHeight

    this.circles = this.createCircles()

    this.audioContextSub = this.lobbyStore.audioContext.subscribe((audioContext) => {
      this.audioContext = audioContext
    })
    this.sourceSub = this.lobbyStore.source.subscribe((source) => {
      const enabled = this.localStorageHelper.getAudioVisualizerStatus()
      if (source && enabled) {
        this.analyser = this.audioContext.createAnalyser()
        source.connect(this.analyser)
        this.analyser.connect(this.lobbyStore.getCurrentLobbyGainNode())
        this.analyser.smoothingTimeConstant = 0.5
        this.analyser.maxDecibels = -10
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
        this.update()
      }
    })
  }

  ngOnDestroy(): void {
    this.sourceSub.unsubscribe()
    this.audioContextSub.unsubscribe()
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
