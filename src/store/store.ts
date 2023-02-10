/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import gameBoardReducer from '../GameBoard/gameBoardSlice'
import reduxWebsocket from '@giantmachines/redux-websocket'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware({})
const reduxWebsocketMiddleware = reduxWebsocket({
  serializer: (payload: any): string | ArrayBuffer | ArrayBufferView | Blob =>
    payload,
  deserializer: (message: any): any => message,
  dateSerializer: (date: any) => date.toISOString(),
  reconnectOnClose: true,
})

export const store = configureStore({
  reducer: {
    gameBoardSlice: gameBoardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //Fix for reduxWebsocket
    })
      .prepend(sagaMiddleware)
      .prepend(reduxWebsocketMiddleware),
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
