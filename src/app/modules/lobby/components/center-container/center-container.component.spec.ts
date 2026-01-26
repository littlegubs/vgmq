import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CenterContainerComponent } from './center-container.component';
import { LobbyStore } from '../../../../core/store/lobby.store';
import { BehaviorSubject } from 'rxjs';
import { LobbyStatuses, LobbyHintMode } from '../../../../shared/models/lobby';
import { LobbyUserRoles, LobbyUserStatus } from '../../../../shared/models/lobby-user';
import { ChangeDetectorRef } from '@angular/core';

describe('CenterContainerComponent', () => {
  let component: CenterContainerComponent;
  let fixture: ComponentFixture<CenterContainerComponent>;
  let lobbyStoreMock: any;

  // Subjects to drive the store
  let canPlayMusicSubject = new BehaviorSubject<boolean>(false);
  let lobbySubject = new BehaviorSubject<any>(null);
  let meSubject = new BehaviorSubject<any>(null);
  let lobbyLoadProgressSubject = new BehaviorSubject<number>(0);
  let errorSubject = new BehaviorSubject<string | undefined>(undefined);
  let lobbyServerBufferSubject = new BehaviorSubject<boolean>(false);

  beforeEach(async () => {
    lobbyStoreMock = {
      canPlayMusic: canPlayMusicSubject.asObservable(),
      lobby: lobbySubject.asObservable(),
      me: meSubject.asObservable(),
      lobbyLoadProgress: lobbyLoadProgressSubject.asObservable(),
      error: errorSubject.asObservable(),
      lobbyServerBuffer: lobbyServerBufferSubject.asObservable(),
      setResumeMusic: jasmine.createSpy('setResumeMusic')
    };

    await TestBed.configureTestingModule({
      declarations: [CenterContainerComponent],
      providers: [
        { provide: LobbyStore, useValue: lobbyStoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CenterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showAnswerComponent (Table Driven Tests)', () => {
    const testCases = [
      {
        description: 'should show answer when playing music, player role, and no hint mode',
        me: { role: LobbyUserRoles.Player, hintMode: false },
        lobby: { status: LobbyStatuses.PlayingMusic },
        expected: true
      },
      {
        description: 'should NOT show answer when spectator',
        me: { role: LobbyUserRoles.Spectator, hintMode: false },
        lobby: { status: LobbyStatuses.PlayingMusic },
        expected: false
      },
      {
        description: 'should NOT show answer when user has hint mode',
        me: { role: LobbyUserRoles.Player, hintMode: true },
        lobby: { status: LobbyStatuses.PlayingMusic },
        expected: false
      },
      {
        description: 'should NOT show answer when lobby is not playing music',
        me: { role: LobbyUserRoles.Player, hintMode: false },
        lobby: { status: LobbyStatuses.Loading },
        expected: false
      }
    ];

    testCases.forEach(({ description, me, lobby, expected }) => {
      it(description, () => {
        meSubject.next(me);
        lobbySubject.next(lobby);
        fixture.detectChanges();
        expect(component.showAnswerComponent()).toBe(expected);
      });
    });
  });

  describe('showEmptyTopDiv (Table Driven Tests)', () => {
    const testCases = [
       {
         description: 'should show empty top div when buffering',
         lobby: { status: LobbyStatuses.Buffering, hintMode: LobbyHintMode.Allowed },
         expected: true
       },
       {
         description: 'should show empty top div when loading',
         lobby: { status: LobbyStatuses.Loading, hintMode: LobbyHintMode.Allowed },
         expected: true
       },
       {
         description: 'should show empty top div when hint mode is NOT Allowed',
         lobby: { status: LobbyStatuses.PlayingMusic, hintMode: LobbyHintMode.Hidden },
         expected: true
       },
       {
         description: 'should NOT show empty top div when playing and allowed',
         lobby: { status: LobbyStatuses.PlayingMusic, hintMode: LobbyHintMode.Allowed },
         expected: false
       }
    ];

    testCases.forEach(({ description, lobby, expected }) => {
      it(description, () => {
        lobbySubject.next(lobby);
        fixture.detectChanges();
        expect(component.showEmptyTopDiv()).toBe(expected);
      });
    });
  });

  it('should call setResumeMusic when play is clicked', () => {
    component.play();
    expect(lobbyStoreMock.setResumeMusic).toHaveBeenCalled();
  });
});
