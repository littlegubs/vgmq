import { Component } from '@angular/core'

type imagesTypes = 'idle' | 'typing' | 'correctAnswer' | 'wrongAnswer' | 'wrongGuess' | 'hint'
@Component({
  selector: 'app-skin-editor',
  templateUrl: './skin-editor.component.html',
})
export class SkinEditorComponent {
  idleImages: Array<string | ArrayBuffer> = []
  typingImages: Array<string | ArrayBuffer> = []
  correctAnswerImages: Array<string | ArrayBuffer> = []
  wrongAnswerImages: Array<string | ArrayBuffer> = []
  wrongGuessImages: Array<string | ArrayBuffer> = []
  hintImages: Array<string | ArrayBuffer> = []

  selectedSource: string | ArrayBuffer = ''
  setImages($event: Array<string | ArrayBuffer>, type: imagesTypes): void {
    this[`${type}Images`] = $event
    if (this.selectedSource === '') {
      this.selectedSource = this[`${type}Images`][0]
    }
  }

  selectRandomSource(type: imagesTypes): void {
    const array = this[`${type}Images`]
    this.selectedSource = array[Math.floor(Math.random() * array.length)]
    if (type === 'wrongGuess') {
      setTimeout(() => {
        this.selectedSource = this.idleImages[Math.floor(Math.random() * this.idleImages.length)]
      }, 500)
    }
  }
}
