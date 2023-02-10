import { Box, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { send } from '@giantmachines/redux-websocket'
import {
  markBomb,
  selectGameBoardState,
  selectMarkedBombs,
  setGameBoardStatus,
  unMarkBomb,
} from './gameBoardSlice'
import clsx from 'clsx'
import { memo, useCallback } from 'react'

const useStyles = makeStyles({
  board: {
    width: '100%',
    overflowX: 'auto',
  },
  cell: {
    margin: '1px',
    width: 25,
    height: 25,
    minWidth: 25,
    minHeight: 25,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '1px solid grey',
    backgroundColor: 'grey !important',
  },
  marked: {
    backgroundColor: 'orangered !important',
    border: '1px solid orangered',
  },
  oppened: {
    backgroundColor: 'white !important',
  },
})

const GameBoard = () => {
  const gameBoardState = useAppSelector(selectGameBoardState)
  const markedBombs = useAppSelector(selectMarkedBombs)
  const dispatch = useAppDispatch()
  const classes = useStyles()

  const handleOpen = useCallback(
    (marked: boolean, indexX: number, indexY: number) => {
      if (marked) return

      dispatch(setGameBoardStatus('loading'))
      dispatch(send(`open ${indexY} ${indexX}`))
    },
    [dispatch]
  )
  const handleMark = useCallback(
    (marked: boolean, indexX: number, indexY: number) => {
      marked
        ? dispatch(unMarkBomb([indexY, indexX]))
        : dispatch(markBomb([indexY, indexX]))
    },
    [dispatch]
  )

  return (
    <Box className={classes.board}>
      {gameBoardState.map((el, indexX) => {
        return (
          <Box key={`row-${indexX}`} sx={{ display: 'flex' }}>
            {el.split('').map((value, indexY) => {
              const marked = markedBombs.indexOf(`${indexY},${indexX}`) !== -1
              const opened = !isNaN(Number(value))

              return (
                <Paper
                  key={`field-${indexX}-${indexY}`}
                  className={clsx(classes.cell, {
                    [classes.oppened]: opened,
                    [classes.marked]: !opened && marked,
                  })}
                  onClick={() => handleOpen(marked, indexX, indexY)}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    if (opened) return

                    handleMark(marked, indexX, indexY)
                  }}
                >
                  {!opened && marked ? 'B' : value === '□' ? '' : value}
                </Paper>
              )
            })}
          </Box>
        )
      })}
    </Box>
  )
}

export default memo(GameBoard)
