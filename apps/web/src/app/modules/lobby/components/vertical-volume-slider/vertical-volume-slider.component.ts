import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-lobby-vertical-volume-slider',
  standalone: true,
  templateUrl: './vertical-volume-slider.component.html',
})
export class VerticalVolumeSliderComponent {
  @Input() min = 0
  @Input() max = 1
  @Input() step = 0.01
  @Input() value = 0.5

  @Output() valueChange = new EventEmitter<number>()

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    this.valueChange.emit(target.valueAsNumber)
  }

  getProgressPercent(): string {
    const range = this.max - this.min
    const percent = ((this.value - this.min) / range) * 100

    return `${percent}%`
  }
}
