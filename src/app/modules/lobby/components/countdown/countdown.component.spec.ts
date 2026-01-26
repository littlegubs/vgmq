import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CountdownComponent } from './countdown.component';
import { LobbyStore } from '../../../../core/store/lobby.store';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LobbyStatuses } from '../../../../shared/models/lobby';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;
  let lobbyStoreMock: any;
  let lobbySubject: BehaviorSubject<any>;
  let currentLobbyMusicSubject: BehaviorSubject<any>;

  // Mock NgZone to allow fakeAsync to control timers even if runOutsideAngular is used
  const ngZoneMock = {
    run: (fn: Function) => fn(),
    runOutsideAngular: (fn: Function) => fn(),
  };

  beforeEach(async () => {
    lobbySubject = new BehaviorSubject(null);
    currentLobbyMusicSubject = new BehaviorSubject(null);

    lobbyStoreMock = {
      lobby: lobbySubject.asObservable(),
      currentLobbyMusic: currentLobbyMusicSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [CountdownComponent],
      providers: [
        { provide: LobbyStore, useValue: lobbyStoreMock },
        { provide: NgZone, useValue: ngZoneMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Countdown Logic (Table Driven Tests)', () => {
    const testCases = [
      {
        description: 'should start countdown from guessTime - 1 when status is PlayingMusic',
        lobby: { status: LobbyStatuses.PlayingMusic, guessTime: 20 },
        music: null,
        expectedCountdown: 19
      },
      {
        description: 'should set countdown to undefined when status is AnswerReveal',
        lobby: { status: LobbyStatuses.AnswerReveal },
        music: null,
        expectedCountdown: undefined
      },
      {
        description: 'should start countdown from musicFinishesIn - 1 when music update is received',
        lobby: { status: LobbyStatuses.PlayingMusic, guessTime: 20 },
        music: { musicFinishesIn: 10 },
        expectedCountdown: 9
      }
    ];

    testCases.forEach(({ description, lobby, music, expectedCountdown }) => {
      it(description, fakeAsync(() => {
        // Trigger updates
        if (lobby) lobbySubject.next(lobby);
        if (music) currentLobbyMusicSubject.next(music);

        tick(); // Process Observables and potential timer start

        if (expectedCountdown !== undefined) {
           expect(component.countdown).toBe(expectedCountdown);
        } else {
           expect(component.countdown).toBeUndefined();
        }
      }));
    });
  });

  it('should decrease countdown over time', fakeAsync(() => {
      lobbySubject.next({ status: LobbyStatuses.PlayingMusic, guessTime: 5 });
      fixture.detectChanges();

      expect(component.countdown).toBe(4);

      // Advance time by 1 second
      tick(1000);
      expect(component.countdown).toBe(3);

      tick(3000);
      expect(component.countdown).toBe(0);

      // Finish
      tick(1000);
      expect(component.countdown).toBeUndefined();
  }));
});
