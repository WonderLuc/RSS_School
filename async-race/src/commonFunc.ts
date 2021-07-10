import { state } from './State/State';

export function leafThroughtPage(
  page: 'garagePage' | 'winnersPage',
  isForward: boolean
): void {
  if (page === 'garagePage') {
    state.garagePage = isForward ? state.garagePage + 1 : state.garagePage - 1;
  }
  if (page === 'winnersPage') {
    state.winnersPage = isForward
      ? state.winnersPage + 1
      : state.winnersPage - 1;
  }
}
