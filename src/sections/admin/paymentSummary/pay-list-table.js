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

export const PayListTable = props => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props

  const selectedSome = selected.length > 0 && selected.length < items.length
  const selectedAll = items.length > 0 && selected.length === items.length
  const enableBulkActions = false;//selected.length > 0
  const { t } = useTranslation();

  return (
    <Box sx={{ position: 'relative' }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>{t(tokens.admin.paymentSummary.name)}</TableCell>
            <TableCell>{t(tokens.admin.paymentSummary.payAmount)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((pay, index) => {
            return (
              <TableRow hover key={pay.id}>
                <TableCell>
                  <Typography color='text.secondary' variant='h6'>
                    {pay.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color='text.secondary' variant='body2'>
                    ${parseFloat(pay.total_amount.toFixed(2))}
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

PayListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
}
