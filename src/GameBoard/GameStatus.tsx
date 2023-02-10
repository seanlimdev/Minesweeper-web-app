import { useAppSelector } from '../store/hooks'
import { selectGameBoardStatus } from './gameBoardSlice'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import ErrorIcon from '@mui/icons-material/Error'
import SyncIcon from '@mui/icons-material/Sync'
import CelebrationIcon from '@mui/icons-material/Celebration'

export default function GameStatus() {
  const gameBoardStatus = useAppSelector(selectGameBoardStatus)
  switch (gameBoardStatus) {
    case 'idle':
      return <SentimentSatisfiedAltIcon color="primary" />
    case 'error':
      return <ErrorIcon color="primary" />
    case 'win':
      return <CelebrationIcon color="primary" />
    case 'lose':
      return <SentimentVeryDissatisfiedIcon color="primary" />
    default:
      return <SyncIcon color="primary" />
  }
}
