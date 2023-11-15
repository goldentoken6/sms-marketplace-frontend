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
import { getInitials } from 'src/utils/get-initials'
import { SeverityPill } from 'src/components/severity-pill'
import { numbersApi } from 'src/api/numbers'
import { useAuth } from 'src/hooks/use-auth'
import { toast } from 'react-hot-toast'
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";

export const NumberListTable = props => {
  const { t } = useTranslation();
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
    onDeleteDone
  } = props

  const selectedSome = selected.length > 0 && selected.length < items.length
  const selectedAll = items.length > 0 && selected.length === items.length
  const enableBulkActions = selected.length > 0
  const { user } = useAuth();

  const handleDelete = async () => {
    console.log('selected >>>', selected);
    if (await numbersApi.deleteNumber({ id: user.id, numberIds: selected })) {
      toast.success('Number deleted');
      onDeleteDone.apply();
    } else {
      toast.error('Number delete failed');
    }
  }

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
          <Button color='inherit' size='small' onClick={handleDelete}>
            {t(tokens.common.delete)}
          </Button>
          {/* <Button color="inherit" size="small">
            Edit
          </Button> */}
        </Stack>
      )}
      {/* <Scrollbar> */}
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'>
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
            </TableCell>
            <TableCell>{t(tokens.client.numbers.number)}</TableCell>
            <TableCell>{t(tokens.client.numbers.type)}</TableCell>
            <TableCell>{t(tokens.client.numbers.status)}</TableCell>
            {/* <TableCell align='right'>Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(number => {
            const isSelected = selected.includes(number.id)
            const statusColor =
              number.status === 'subscribed' ? 'success' : 'info'

            return (
              <TableRow hover key={number.id} selected={isSelected}>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={isSelected}
                    onChange={event => {
                      if (event.target.checked) {
                        onSelectOne?.(number.id)
                      } else {
                        onDeselectOne?.(number.id)
                      }
                    }}
                    value={isSelected}
                  />
                </TableCell>
                <TableCell>{number.number}</TableCell>
                <TableCell>{number.type}</TableCell>
                <TableCell>
                  <SeverityPill color={statusColor}>
                    {number.status}
                  </SeverityPill>
                </TableCell>
                {/* <TableCell align='right'>
                  <IconButton
                    component={RouterLink}
                    href={paths.dashboard.numbers.edit}
                  >
                    <SvgIcon>
                      <Edit02Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton
                    component={RouterLink}
                    href={paths.dashboard.numbers.details}
                  >
                    <SvgIcon>
                      <ArrowRightIcon />
                    </SvgIcon>
                  </IconButton>
                </TableCell> */}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {/* </Scrollbar> */}
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

NumberListTable.propTypes = {
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
  onDeleteDone: PropTypes.func
}
