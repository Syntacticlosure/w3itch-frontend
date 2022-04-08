import { Box, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Rating from '@mui/material/Rating'
import { UpdateGameRatingsMine } from 'api'
import { PrimaryLoadingButton } from 'components/CustomizedButtons'
import { useSnackbar } from 'notistack'
import { FC, useCallback, useEffect, useState } from 'react'
import { Api } from 'types/Api'
import { calcRating } from 'utils'

export interface GameRatingProps {
  readonly id: number
  readonly gameRatingMine: Api.GameProjectsRatingResponse | undefined
  readonly gameRatingDialogOpen: boolean
  setGameRatingDialogOpen: (value: boolean) => void
  handleRefresh: () => void
}

const GameRating: FC<GameRatingProps> = ({
  id,
  setGameRatingDialogOpen,
  gameRatingMine,
  gameRatingDialogOpen,
  handleRefresh,
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [rateValue, setRateValue] = useState(0)
  const [ratingLoading, setRatingLoading] = useState(false)

  const handleRatingChange = useCallback(async () => {
    if (rateValue <= 0) {
      enqueueSnackbar('Please choose a rating', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        variant: 'warning',
      })
      return
    }

    try {
      setRatingLoading(true)

      const gameRatingResult = await UpdateGameRatingsMine(id, {
        rating: rateValue * 100,
      })

      if (gameRatingResult.status === 200) {
        enqueueSnackbar('Game rating success', {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'success',
        })
        setGameRatingDialogOpen(false)
        handleRefresh()
      } else {
        console.error(gameRatingResult)
        throw new Error('gameRatingResult error')
      }
    } catch (err) {
      console.log(err)
      enqueueSnackbar('Game rating failed', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        variant: 'warning',
      })
    } finally {
      setRatingLoading(false)
    }
  }, [enqueueSnackbar, id, rateValue, setGameRatingDialogOpen, handleRefresh])

  useEffect(() => {
    if (gameRatingMine) {
      setRateValue(calcRating(gameRatingMine.rating || 0))
    }
  }, [gameRatingMine])

  return (
    <Dialog
      onClose={() => setGameRatingDialogOpen(false)}
      open={gameRatingDialogOpen}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle>Rate</DialogTitle>
      <Box px={3} py={2}>
        <Typography>Choose a rating from 1 to 5 stars.</Typography>
        <Box my={5} display="flex" justifyContent="center">
          <Box p={1} border={2} borderColor={'#dadada'} display="inline-flex">
            <Rating
              value={rateValue}
              onChange={(event, newValue) => {
                console.log(newValue)
                setRateValue(newValue || 0)
              }}
            />
          </Box>
        </Box>
        <Box>
          <PrimaryLoadingButton
            onClick={handleRatingChange}
            loading={ratingLoading}
          >
            Submit
          </PrimaryLoadingButton>
        </Box>
      </Box>
    </Dialog>
  )
}

export default GameRating
