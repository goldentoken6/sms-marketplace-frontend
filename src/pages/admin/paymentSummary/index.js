import { useCallback, useEffect, useMemo, useState } from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material'

import { payApi } from 'src/api/pay'
import { Seo } from 'src/components/seo'
import { useMounted } from 'src/hooks/use-mounted'
import { usePageView } from 'src/hooks/use-page-view'
import { useSelection } from 'src/hooks/use-selection'
import { PayListTable } from 'src/sections/admin/paymentSummary/pay-list-table'
import { paths } from 'src/paths'
import { useAuth } from 'src/hooks/use-auth'
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";

const usePaySearch = () => {
  const [state, setState] = useState({
    page: 0,
    rowsPerPage: 5
  })

  const handlePageChange = useCallback((event, page) => {
    setState(prevState => ({
      ...prevState,
      page
    }))
  }, [])

  const handleRowsPerPageChange = useCallback(event => {
    setState(prevState => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }))
  }, [])

  return {
    handlePageChange,
    handleRowsPerPageChange,
    state
  }
}

const usePayStore = searchState => {
  const isMounted = useMounted()
  const [state, setState] = useState({
    pays: [],
    payCount: 0
  })

  const handlePayGet = useCallback(
    async (force = true) => {
      try {
        const response = await payApi.getAllPay(force, searchState)
        if (isMounted()) {
          setState({
            pays: response.data,
            payCount: response.count
          })
        }
      } catch (err) {
        console.error(err)
      }
    },
    [searchState, isMounted]
  )

  useEffect(() => {
    handlePayGet()
  }, [searchState])
  return {
    ...state
  }
}

const Page = () => {
  const paySearch = usePaySearch()
  const payStore = usePayStore(paySearch.state)
  const { t } = useTranslation();

  usePageView()

  return (
    <>
      <Seo title='Payment Summary' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>{t(tokens.nav.paymentSummary)}</Typography>
              </Stack>
            </Stack>
            <Card>
              <PayListTable
                count={payStore.payCount}
                items={payStore.pays}
                onPageChange={paySearch.handlePageChange}
                onRowsPerPageChange={paySearch.handleRowsPerPageChange}
                page={paySearch.state.page}
                rowsPerPage={paySearch.state.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Page
