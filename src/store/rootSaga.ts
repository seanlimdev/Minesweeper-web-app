import { all } from 'redux-saga/effects'
import minesweeperWebSocket from '../GameBoard/saga'

export default function* rootSaga() {
  yield all([minesweeperWebSocket()])
}
