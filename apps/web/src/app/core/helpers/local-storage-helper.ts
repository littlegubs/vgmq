import { Injectable } from '@angular/core'

const audioGainKey = 'audioPlayerVolume'
const mediaTypeOnRevealKey = 'mediaTypeOnReveal'
const audioVisualizerKey = 'audioVisualizer'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageHelper {
  getDefaultVolume(): number {
    return parseFloat(localStorage.getItem(audioGainKey) ?? '0.5')
  }

  setDefaultVolume($event: number): void {
    localStorage.setItem(audioGainKey, $event.toString())
  }

  getDefaultMediaTypeOnReveal(): number {
    return parseInt(localStorage.getItem(mediaTypeOnRevealKey) ?? '2')
  }

  setDefaultMediaTypeOnReveal($event: number): void {
    localStorage.setItem(mediaTypeOnRevealKey, $event.toString())
  }

  getAudioVisualizerStatus(): boolean {
    const status = localStorage.getItem(audioVisualizerKey)

    return status ? status === 'true' : true
  }

  setAudioVisualizerStatus(status: boolean): void {
    localStorage.setItem(audioVisualizerKey, status.toString())
  }
}
