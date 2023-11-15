import { useCallback, useEffect, useMemo, useState } from "react";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { clientsApi } from "src/api/clients";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { useSelection } from "src/hooks/use-selection";
import { ClientListSearch } from "src/sections/admin/client/client-list-search";
import { ClientListTable } from "src/sections/admin/client/client-list-table";
import { paths } from "src/paths";
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";

const useClientsSearch = () => {
  const [state, setState] = useState({
    filters: {
      query: undefined,
      subscribed: undefined,
      unsubscribed: undefined,
      landline: undefined,
      mobile: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "updatedAt",
    sortDir: "desc",
  });

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback((sort) => {
    setState((prevState) => ({
      ...prevState,
      sortBy: sort.sortBy,
      sortDir: sort.sortDir,
    }));
  }, []);

  const handlePageChange = useCallback((event, page) => {
    setState((prevState) => ({
      ...prevState,
      page,
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

const useClientsStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    clients: [],
    clientsCount: 0,
  });

  const handleClientsGet = useCallback(async (force = true) => {
    try {
      const response = await clientsApi.getClients(force, searchState);
      if (isMounted()) {
        setState({
          clients: response.data,
          clientsCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleClientsGet();
    },
    [searchState]
  );

  const onDeleteClient = () => {
    handleClientsGet(false);
  }

  return {
    ...state,
    onDeleteClient,
  };
};

const useClientsIds = (clients = []) => {
  return useMemo(() => {
    return clients.map((client) => client.id);
  }, [clients]);
};

const Page = () => {
  const clientsSearch = useClientsSearch();
  const clientsStore = useClientsStore(clientsSearch.state);
  const clientsIds = useClientsIds(clientsStore.clients);
  const clientsSelection = useSelection(clientsIds);
  const { t } = useTranslation();

  console.log('clientsStore >>>', clientsStore);

  usePageView();

  return (
    <>
      <Seo title="Client List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t(tokens.common.clients)}</Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  href={paths.admin.clients.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              <ClientListSearch
                onFiltersChange={clientsSearch.handleFiltersChange}
                onSortChange={clientsSearch.handleSortChange}
                sortBy={clientsSearch.state.sortBy}
                sortDir={clientsSearch.state.sortDir}
              />
              <ClientListTable
                count={clientsStore.clientsCount}
                items={clientsStore.clients}
                onDeselectAll={clientsSelection.handleDeselectAll}
                onDeselectOne={clientsSelection.handleDeselectOne}
                onPageChange={clientsSearch.handlePageChange}
                onRowsPerPageChange={clientsSearch.handleRowsPerPageChange}
                onSelectAll={clientsSelection.handleSelectAll}
                onSelectOne={clientsSelection.handleSelectOne}
                page={clientsSearch.state.page}
                rowsPerPage={clientsSearch.state.rowsPerPage}
                selected={clientsSelection.selected}
                onDelete={clientsStore.onDeleteClient}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
