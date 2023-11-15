import numeral from 'numeral'
import PropTypes from 'prop-types'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import { RouterLink } from 'src/components/router-link'
import { Scrollbar } from 'src/components/scrollbar'
import { paths } from 'src/paths'
import { SeverityPill } from 'src/components/severity-pill'
import { getInitials } from 'src/utils/get-initials'
import toast from 'react-hot-toast'
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";

export const SMSListTable = props => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    onDelete
  } = props

  const selectedSome = selected.length > 0 && selected.length < items.length
  const selectedAll = items.length > 0 && selected.length === items.length
  const enableBulkActions = false;//selected.length > 0
  const { t } = useTranslation();

  return (
    <Box sx={{ position: 'relative' }}>
      {enableBulkActions && (
        <Stack
          direction='row'
          spacing={2}
          sx={{
            alignItems: 'center',
            backgroundColor: theme =>
              theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
            display: enableBulkActions ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            px: 2,
            py: 0.5,
            zIndex: 10
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={event => {
              if (event.target.checked) {
                onSelectAll?.()
              } else {
                onDeselectAll?.()
              }
            }}
          />
          <Button color='inherit' size='small'>
            {t(tokens.common.delete)}
          </Button>
          {/* <Button color="inherit" size="small">
            Edit
          </Button> */}
        </Stack>
      )}
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {/* <TableCell padding='checkbox'>
              <Checkbox
                checked={selectedAll}
                indeterminate={selectedSome}
                onChange={event => {
                  if (event.target.checked) {
                    onSelectAll?.()
                  } else {
                    onDeselectAll?.()
                  }
                }}
              />
            </TableCell> */}
            <TableCell>{t(tokens.admin.smsSummary.name)}</TableCell>
            <TableCell>{t(tokens.admin.smsSummary.number)}</TableCell>
            <TableCell>{t(tokens.admin.smsSummary.content)}</TableCell>
            <TableCell>{t(tokens.admin.smsSummary.status)}</TableCell>
            <TableCell>{t(tokens.admin.smsSummary.datetime)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(sms => {
            const isSelected = selected.includes(sms.id)
            const statusColor = sms.send_status === '1' ? 'success' : 'info'

            return (
              <TableRow hover key={sms.id} selected={isSelected}>
                {/* <TableCell padding='checkbox'>
                  <Checkbox
                    checked={isSelected}
                    onChange={event => {
                      if (event.target.checked) {
                        onSelectOne?.(sms.id)
                      } else {
                        onDeselectOne?.(sms.id)
                      }
                    }}
                    value={isSelected}
                  />
                </TableCell> */}
                {/* <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Avatar
                        src={client.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(client.name)}
                      </Avatar> 
                      <div>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          href={paths.admin.clients.details.replace(
                            ":clientId",
                            client.id
                          )}
                          variant="subtitle2"
                        >
                          {client.name}
                        </Link>
                        <Typography color="text.secondary" variant="body2">
                          {client.email}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell> */}
                <TableCell>
                  <Typography color='text.secondary' variant='body2'>
                    {sms.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color='text.secondary' variant='body2'>
                    {sms.number}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color='text.secondary' variant='body2'>
                    {sms.content}
                  </Typography>
                </TableCell>
                <TableCell>
                  <SeverityPill color={statusColor}>
                    {sms.send_status ? 'SENT' : 'PENDING'}
                  </SeverityPill>
                </TableCell>
                <TableCell>
                  <Typography color='text.secondary' variant='body2'>
                    {new Date(sms.send_at * 1000).toLocaleString()}
                  </Typography>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  )
}

SMSListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  onDelete: PropTypes.func
}
