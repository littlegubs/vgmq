import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NgIf } from '@angular/common'
import { MatIcon } from '@angular/material/icon'

@Component({
  selector: 'app-image-type',
  standalone: true,
  imports: [NgIf, MatIcon],
  templateUrl: './image-type.component.html',
})
export class ImageTypeComponent {
  @Input() type: string
  images: Array<string | ArrayBuffer> = []
  @Output() imagesChange = new EventEmitter<Array<string | ArrayBuffer>>()
  preUploadImage(event: any, i?: number): void {
    const target = event.target as HTMLInputElement
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (): void => {
      if (i !== undefined) {
        this.images[i] = reader.result
      } else {
        this.images.push(reader.result)
      }
      this.imagesChange.emit(this.images)
    }

    reader.readAsDataURL(file)
  }

  delete($index: number): void {
    this.images.splice($index, 1)
    this.imagesChange.emit(this.images)
  }
}
