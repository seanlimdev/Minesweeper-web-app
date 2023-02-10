import { render, RenderResult } from '@testing-library/react'
import App from './App'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureStore([])

describe('Redux connected component.', () => {
  let store
  let component: RenderResult

  beforeEach(() => {
    store = mockStore({
      gameBoardSlice: {
        value: [],
        markedBombs: [],
        level: 1,
        status: 'idle',
      },
    })

    component = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })

  it('should render with given state from Redux store', () => {
    expect(component.findByRole('button', { text: /Start New Game Level 1/i }))
  })
})
