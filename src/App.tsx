import { send } from '@giantmachines/redux-websocket/dist'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  SelectChangeEvent,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import GameBoard from './GameBoard/GameBoard'
import {
  selectGameBoardLevel,
  setGameLevel,
  setGameBoardStatus,
  clearMarkedBombs,
  selectGameBoardState,
} from './GameBoard/gameBoardSlice'
import GameStatus from './GameBoard/GameStatus'
import { useAppSelector, useAppDispatch } from './store/hooks'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    minWidth: '400px',
    padding: '50px',
  },
  control: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
  },
})

function App() {
  const gameBoardState = useAppSelector(selectGameBoardState)
  const gameLevel = useAppSelector(selectGameBoardLevel)
  const dispatch = useAppDispatch()
  const classes = useStyles()

  const handleOnLevelChange = (event: SelectChangeEvent) => {
    const newLevel = Number(event?.target?.value)
    dispatch(setGameLevel(newLevel))
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.control}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <RadioGroup value={gameLevel} onChange={handleOnLevelChange} row>
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Level 1"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Level 2"
                />
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label="Level 3"
                />
                <FormControlLabel
                  value={4}
                  control={<Radio />}
                  label="Level 4"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button
            sx={{ m: 1 }}
            variant="contained"
            onClick={() => {
              dispatch(setGameBoardStatus('loading'))
              dispatch(send(`new ${gameLevel}`))
              dispatch(clearMarkedBombs())
            }}
          >
            Start
          </Button>
        </Box>
        <Box textAlign="center" pt={3}>
          {gameBoardState.length > 0 ? <GameStatus /> : null}
        </Box>
        <GameBoard />
      </Box>
    </Box>
  )
}

export default App
