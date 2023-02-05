import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LeagueEffects } from './league.effects';

describe('LeagueEffects', () => {
  let actions$: Observable<any>;
  let effects: LeagueEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LeagueEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LeagueEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
