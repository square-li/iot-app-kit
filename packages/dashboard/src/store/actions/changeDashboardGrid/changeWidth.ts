import { changeGridProperty } from './updateGrid';
import type { Action } from 'redux';
import type { DashboardState } from '../../state';

type ChangeDashboardWidthActionPayload = {
  width: number;
};
export interface ChangeDashboardWidthAction extends Action {
  type: 'CHANGE_WIDTH';
  payload: ChangeDashboardWidthActionPayload;
}

export const onChangeDashboardWidthAction = (
  payload: ChangeDashboardWidthActionPayload
): ChangeDashboardWidthAction => ({
  type: 'CHANGE_WIDTH',
  payload,
});

export const changeDashboardWidth = (state: DashboardState, action: ChangeDashboardWidthAction): DashboardState =>
  changeGridProperty(state, 'width', Math.max(0, action.payload.width));
