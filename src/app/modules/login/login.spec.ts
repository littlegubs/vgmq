import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { LoginComponent } from './login.component'

test('should fetch users', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginComponent],
    }).compileComponents()
  })

  test('check formGroup validators', () => {
    const fixture = TestBed.createComponent(LoginComponent)
    const component = fixture.componentInstance
    component.loginForm.hasValidator()
  })
})

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule],
//       declarations: [LoginComponent],
//     }).compileComponents()
//   })
//
//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent)
//     const app = fixture.componentInstance
//     expect(app).toBeTruthy()
//   })
//
//   it(`should have as title '3wPano'`, () => {
//     const fixture = TestBed.createComponent(AppComponent)
//     const app = fixture.componentInstance
//     expect(app.title).toEqual('3wPano')
//   })
//
//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent)
//     fixture.detectChanges()
//     const compiled = fixture.nativeElement as HTMLElement
//     expect(compiled.querySelector('.content span')?.textContent).toContain('3wPano app is running!')
//   })
// })
