import numeral from "numeral";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
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
  Typography,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scrollbar";
import { paths } from "src/paths";
import { SeverityPill } from "src/components/severity-pill";
import { getInitials } from "src/utils/get-initials";
import { clientsApi } from "src/api/clients";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";

export const ClientListTable = (props) => {
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
    onDelete,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const enableBulkActions = selected.length > 0;

  const handleDelete = async () => {
    console.log('selected >>>', selected);
    if (await clientsApi.deleteClients(selected)) {
      toast.success('Client deleted');
      onDelete.apply();
    } else {
      toast.error('Client delete failed');
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      {enableBulkActions && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            display: enableBulkActions ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={(event) => {
              if (event.target.checked) {
                onSelectAll?.();
              } else {
                onDeselectAll?.();
              }
            }}
          />
          <Button color="inherit" size="small" onClick={handleDelete}>
            {t(tokens.common.delete)}
          </Button>
          {/* <Button color="inherit" size="small">
            Edit
          </Button> */}
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>{t(tokens.common.name)}</TableCell>
              <TableCell>{t(tokens.common.numberCount)}</TableCell>
              <TableCell>{t(tokens.common.smsCount)}</TableCell>
              <TableCell align="right">{t(tokens.admin.actions)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((client) => {
              const isSelected = selected.includes(client.id);
              const statusColor =
                client.status === "subscribed" ? "success" : "info";

              return (
                <TableRow hover key={client.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectOne?.(client.id);
                        } else {
                          onDeselectOne?.(client.id);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <SeverityPill color={statusColor}>
                      {client.numbersCount}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>
                    <SeverityPill color={statusColor}>
                      {client.smsCount}
                    </SeverityPill>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      component={RouterLink}
                      href={paths.admin.clients.edit.replace(
                        ":clientId",
                        client.id
                      )}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    {/* <IconButton
                      component={RouterLink}
                      href={paths.admin.clients.details.replace(
                        ":clientId",
                        client.id
                      )}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton> */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

ClientListTable.propTypes = {
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
  onDelete: PropTypes.func,
};
