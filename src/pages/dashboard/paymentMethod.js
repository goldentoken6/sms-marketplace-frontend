import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01'
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { useSettings } from 'src/hooks/use-settings'
import { CheckoutBilling } from 'src/sections/dashboard/paymentMethod/payment-method'
import React, { useEffect, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import toast from 'react-hot-toast'
import { SERVER_URL } from 'src/constants'
import { useAuth } from 'src/hooks/use-auth'
import { IMaskInput } from 'react-imask'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";

const initialBilling = {
  cardExpirationDate: '',
  cardNumber: '',
  cardOwner: '',
  cardSecurityCode: ''
}

const CreditCardMask = React.forwardRef(function CreditCardMask (props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask='0000 0000 0000 0000'
      definitions={{
        '#': /[1-9]/
      }}
      inputRef={ref}
      onAccept={value => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

CreditCardMask.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

const CreditCardExpirationMask = React.forwardRef(
  function CreditCardExpirationMask (props, ref) {
    const { onChange, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask='00/00'
        definitions={{
          '#': /[1-9]/
        }}
        inputRef={ref}
        onAccept={value => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    )
  }
)

CreditCardExpirationMask.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

const CreditCardCVCMask = React.forwardRef(
  function CreditCardCVCMask (props, ref) {
    const { onChange, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask='0000'
        definitions={{
          '#': /[1-9]/
        }}
        inputRef={ref}
        onAccept={value => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    )
  }
)

CreditCardCVCMask.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

const Page = () => {
  const settings = useSettings()
  const [billing, setBilling] = useState(initialBilling)
  const { user } = useAuth()
  const { t } = useTranslation();

  const handleSubmit = async () => {
    console.log('handleSubmit')
    const response = await axios.post(
      `${SERVER_URL}/setpayment`,
      {
        ...billing,
        userid: user.id,
        email: user.email
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.status === 200) {
      toast.success('Payment Method saved!')
    } else {
      toast.error('Something went wrong!')
    }
  }

  usePageView()

  useEffect(() => {
    console.log('start')
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/paymentquery`,
          {
            userid: user.id
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        console.log('Start Billing====>', response.data[0])
        if (response.data[0] !== undefined) {
          setBilling(prevState => ({
            ...prevState,
            cardExpirationDate: response.data[0].expiredate,
            cardNumber: response.data[0].cardnumber,
            cardOwner: response.data[0].cardname,
            cardSecurityCode: response.data[0].securitycode
          }))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleBillingChange = useCallback(event => {
    setBilling(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }, [])
  return (
    <>
      <Seo title='Dashboard: Payment Method' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}>
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <div>
                  <Typography variant='h4'>{t(tokens.nav.paymentMethod)}</Typography>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12} lg={8}>
              <Stack spacing={3}>
                <div>
                  <div>
                    <Grid container spacing={3}>
                      <Grid xs={12} sm={6}>
                      <InputLabel htmlFor='formatted-text-mask-input'>
                          {t(tokens.client.paymentMethod.nameOnCard)}
                        </InputLabel>
                        <Input
                          fullWidth
                          label={t(tokens.client.paymentMethod.nameOnCard)}
                          name='cardOwner'
                          onChange={handleBillingChange}
                          value={billing.cardOwner}
                        />
                      </Grid>
                      <Grid sm={6} />
                      <Grid xs={12} sm={6}>
                        <InputLabel htmlFor='formatted-text-mask-input'>
                        {t(tokens.client.paymentMethod.creditCardNumber)}
                        </InputLabel>
                        <Input
                          fullWidth
                          label={t(tokens.client.paymentMethod.creditCardNumber)}
                          name='cardNumber'
                          placeholder='0000 0000 0000 0000'
                          onChange={handleBillingChange}
                          inputComponent={CreditCardMask}
                          value={billing.cardNumber}
                        />
                      </Grid>
                      <Grid sm={6} />
                      <Grid xs={12} sm={3}>
                        <InputLabel htmlFor='formatted-text-mask-input'>
                        {t(tokens.client.paymentMethod.expDate)}
                        </InputLabel>
                        <Input
                          fullWidth
                          label={t(tokens.client.paymentMethod.expDate)}
                          name='cardExpirationDate'
                          onChange={handleBillingChange}
                          placeholder='MM/YY'
                          inputComponent={CreditCardExpirationMask}
                          value={billing.cardExpirationDate}
                        />
                      </Grid>
                      <Grid xs={12} sm={3}>
                        <InputLabel htmlFor='formatted-text-mask-input'>
                        {t(tokens.client.paymentMethod.securityCode)}
                        </InputLabel>
                        <Input
                          fullWidth
                          label={t(tokens.client.paymentMethod.securityCode)}
                          name='cardSecurityCode'
                          onChange={handleBillingChange}
                          inputComponent={CreditCardCVCMask}
                          value={billing.cardSecurityCode}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 3
                  }}
                >
                  <Button
                    fullWidth
                    size='large'
                    variant='contained'
                    onClick={handleSubmit}
                  >
                    {t(tokens.client.paymentMethod.submit)}
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Page
