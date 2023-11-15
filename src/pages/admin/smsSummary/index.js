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
import { smsApi } from 'src/api/sms'
import { Seo } from 'src/components/seo'
import { useMounted } from 'src/hooks/use-mounted'
import { usePageView } from 'src/hooks/use-page-view'
import { useSelection } from 'src/hooks/use-selection'
import { SMSListSearch } from 'src/sections/admin/sms/sms-list-search'
import { SMSListTable } from 'src/sections/admin/sms/sms-list-table'
import { paths } from 'src/paths'
import { useAuth } from 'src/hooks/use-auth'
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";

const useSMSSearch = () => {
  const [state, setState] = useState({
    filters: {
      query: undefined
    },
    page: 0,
    rowsPerPage: 5
  })

  const handleFiltersChange = useCallback(filters => {
    setState(prevState => ({
      ...prevState,
      filters
    }))
  }, [])

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
    handleFiltersChange,
    handlePageChange,
    handleRowsPerPageChange,
    state
  }
}

const useSMSStore = searchState => {
  const isMounted = useMounted()
  const [state, setState] = useState({
    sms: [],
    smsCount: 0
  })

  const handleSMSGet = useCallback(
    async (force = true) => {
      try {
        const response = await smsApi.getAllSMS(force, searchState)
        if (isMounted()) {
          setState({
            sms: response.data,
            smsCount: response.count
          })
        }
      } catch (err) {
        console.error(err)
      }
    },
    [searchState, isMounted]
  )

  useEffect(() => {
    handleSMSGet()
  }, [searchState])
  return {
    ...state
  }
}

const useSMSsIds = (smss = []) => {
  return useMemo(() => {
    return smss.map(sms => sms.id)
  }, [smss])
}

const Page = () => {
  const smsSearch = useSMSSearch()
  const smsStore = useSMSStore(smsSearch.state)
  const smssIds = useSMSsIds(smsStore.sms)
  const smsSelection = useSelection(smssIds)
  const { t } = useTranslation();

  usePageView()

  return (
    <>
      <Seo title='SMS Summary' />
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
                <Typography variant='h4'>{t(tokens.nav.smsSummary)}</Typography>
              </Stack>
            </Stack>
            <Card>
              <SMSListSearch
                onFiltersChange={smsSearch.handleFiltersChange}
                onSortChange={smsSearch.handleSortChange}
                sortBy={smsSearch.state.sortBy}
                sortDir={smsSearch.state.sortDir}
              />
              <SMSListTable
                count={smsStore.smsCount}
                items={smsStore.sms}
                onDeselectAll={smsSelection.handleDeselectAll}
                onDeselectOne={smsSelection.handleDeselectOne}
                onPageChange={smsSearch.handlePageChange}
                onRowsPerPageChange={smsSearch.handleRowsPerPageChange}
                onSelectAll={smsSelection.handleSelectAll}
                onSelectOne={smsSelection.handleSelectOne}
                page={smsSearch.state.page}
                rowsPerPage={smsSearch.state.rowsPerPage}
                selected={smsSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Page
