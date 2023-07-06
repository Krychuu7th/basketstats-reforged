import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Team } from 'src/app/models/team';
import { Page } from 'src/app/shared/model/pageable';
import { QueryParams } from 'src/app/shared/model/query-params';

export const loadTeams = createAction(
  '[Team/API] Load Teams',
  props<{ leagueId: number, queryParams: QueryParams }>()
);

export const loadAllTeams = createAction(
  '[Team/API] Load All Teams'
);

export const loadTeamsSuccess = createAction(
  '[Team Effect] Load Teams Success',
  props<{
    leagueId: number,
    teamsPage: Page<Team>,
    queryParams: QueryParams
  }>()
);

export const loadTeamsFailure = createAction(
  '[Team Effect] Load Teams Failure',
  props<{ error: any }>()
);

export const loadAllTeamsSuccess = createAction(
  '[Team Effect] Load All Teams Success',
  props<{ teams: Team[] }>()
);

export const loadAllTeamsFailure = createAction(
  '[Team Effect] Load All Teams Failure',
  props<{ error: any }>()
);

export const loadTeam = createAction(
  '[Team/API] Load Team',
  props<{ id: number }>()
);

export const loadTeamSuccess = createAction(
  '[Team Effect] Load Team Success',
  props<{ team: Team }>()
);

export const loadTeamFailure = createAction(
  '[Team Effect] Load Team Failure',
  props<{ error: any }>()
);

export const addTeam = createAction(
  '[Team/API] Add Team',
  props<{ team: Team }>()
);

export const addTeamSuccess = createAction(
  '[Team Effect] Add Team Success',
  props<{ team: Team }>()
);

export const addTeamFailure = createAction(
  '[Team Effect] Add Team Failure',
  props<{ error: any }>()
);

export const upsertTeam = createAction(
  '[Team/API] Upsert Team',
  props<{ team: Team }>()
);

export const upsertTeamSuccess = createAction(
  '[Team Effect] Upsert Team Success',
  props<{ team: Team }>()
);

export const upsertTeamFailure = createAction(
  '[Team Effect] Upsert Team Failure',
  props<{ error: any }>()
);

export const addTeams = createAction(
  '[Team/API] Add Teams',
  props<{ teams: Team[] }>()
);

export const upsertTeams = createAction(
  '[Team/API] Upsert Teams',
  props<{ teams: Team[] }>()
);

export const updateTeam = createAction(
  '[Team/API] Update Team',
  props<{ team: Update<Team> }>()
);

export const updateTeams = createAction(
  '[Team/API] Update Teams',
  props<{ teams: Update<Team>[] }>()
);

export const deleteTeam = createAction(
  '[Team/API] Delete Team',
  props<{ leagueId: number, teamId: number }>()
);

export const deleteTeamSuccess = createAction(
  '[Team Effect] Delete Team Success'
);

export const deleteTeamFailure = createAction(
  '[Team Effect] Delete Team Failure',
  props<{ error: any }>()
);

export const deleteTeams = createAction(
  '[Team/API] Delete Teams',
  props<{ ids: number[] }>()
);

export const clearTeams = createAction(
  '[Team/API] Clear Teams'
);
