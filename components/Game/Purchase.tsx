import styled from '@emotion/styled'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { PrimaryButton } from 'components/CustomizedButtons'
import { AuthenticationContext } from 'context'
import { utils } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { useBuyNow } from 'hooks/useBuyNow'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import { FC, useCallback, useContext } from 'react'
import styles from 'styles/game/id.module.scss'
import { TokenDetail } from 'types'
import {
  balanceDecimal,
  ExplorerDataType,
  getChainInfoFromId,
  getExplorerLink,
} from 'utils'

const ExplorerLink = styled.a`
  font-size: 120%;
  font-weight: bold;
  color: inherit;
`

interface PurchaseProps {
  readonly pricesTokens: TokenDetail[]
  refresh: () => void
}

const Purchase: FC<PurchaseProps> = ({ pricesTokens, refresh }) => {
  const { buyNow } = useBuyNow()
  const {
    state: { user },
  } = useContext(AuthenticationContext)
  const { enqueueSnackbar } = useSnackbar()

  const handleBuyNow = useCallback(
    ({
      chainId,
      inputCurrency,
      outputCurrency,
    }: {
      chainId: number
      inputCurrency: string
      outputCurrency: string
    }) => {
      if (user) {
        buyNow({
          chainId: chainId,
          inputCurrency: inputCurrency,
          outputCurrency: outputCurrency,
        })
      } else {
        enqueueSnackbar('please sign in!', {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'info',
        })
      }
    },
    [buyNow, enqueueSnackbar, user]
  )

  return (
    <Box>
      <h2 className={styles.row_title}>Purchase</h2>
      <Box display="grid" gap={3}>
        {pricesTokens.map((pricesToken) => (
          <Box key={`${pricesToken.chainId}_${pricesToken.address}`}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <PrimaryButton
                onClick={() =>
                  handleBuyNow({
                    chainId: pricesToken.chainId,
                    inputCurrency: '',
                    outputCurrency: getAddress(pricesToken.address),
                  })
                }
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                Buy Now
              </PrimaryButton>
              <Typography
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginLeft: 1,
                }}
                component="span"
              >
                <Link
                  passHref
                  href={getExplorerLink(
                    pricesToken.chainId,
                    getAddress(pricesToken.address),
                    ExplorerDataType.TOKEN
                  )}
                >
                  <ExplorerLink target="_blank" rel="noopener noreferrer">
                    {balanceDecimal(
                      utils.formatUnits(
                        pricesToken.amount,
                        pricesToken.decimals
                      )
                    )}{' '}
                    {pricesToken.symbol}
                  </ExplorerLink>
                </Link>
                <Typography
                  component="span"
                  sx={{
                    color: 'inherit',
                    opacity: 0.9,
                    marginLeft: 0.5,
                    marginRight: 0.5,
                  }}
                >
                  ({getChainInfoFromId(pricesToken.chainId)?.label})
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: 'inherit',
                    opacity: 0.5,
                  }}
                >
                  or more
                </Typography>
              </Typography>
            </Box>
            <>
              <Box
                sx={{
                  marginTop: 1,
                }}
              >
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Balance:{' '}
                  {isEmpty(pricesToken) || !pricesToken?.balanceOf
                    ? '0'
                    : balanceDecimal(
                        utils.formatUnits(
                          pricesToken.balanceOf,
                          pricesToken.decimals
                        )
                      )}{' '}
                  {pricesToken.symbol}
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  onClick={refresh}
                  sx={{
                    marginLeft: 1,
                    color: '#989898',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  refresh
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#6a6a6a',
                }}
              >
                To play this game, you must hold at least{' '}
                {utils.formatUnits(pricesToken.amount, pricesToken.decimals)}{' '}
                {pricesToken.symbol}.
              </Typography>
            </>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Purchase
