import { useCallback, useEffect, useMemo, useState } from "react";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import FilterFunnel01 from "@untitled-ui/icons-react/build/esm/FilterFunnel01";

import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { numbersApi } from "src/api/numbers";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { useSelection } from "src/hooks/use-selection";
import { NumberListSearch } from "src/sections/dashboard/number/number-list-search";
import { NumberListTable } from "src/sections/dashboard/number/number-list-table";
import { paths } from "src/paths";
import CreditCardPayment from "../creditCardPayment";

import axios from 'axios';
import { useAuth } from "src/hooks/use-auth";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";

const useNumbersSearch = () => {
  const [state, setState] = useState({
    filters: {
      query: undefined,
      subscribed: undefined,
      unsubscribed: undefined,
      landline: undefined,
      mobile: undefined
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
    // setState((prevState) => ({
    //   ...prevState,
    //   sortBy: sort.sortBy,
    //   sortDir: sort.sortDir,
    // }));
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

const useNumbersStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    numbers: [],
    numbersCount: 0,
    unfiltered: 0,
  });
  const { user } = useAuth();

  const handleNumbersGet = useCallback(async (force = true) => {
    try {
      const response = await numbersApi.getNumbers(force, user.id, searchState);
      if (isMounted()) {
        setState({
          numbers: response.data,
          numbersCount: response.count,
          unfiltered: response.unfiltered,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleNumbersGet();
    },
    
    [searchState]
  );

  const onDeleteNumberDone = () => {
    handleNumbersGet(false);
  }

  return {
    ...state,
    handleNumbersGet,
    onDeleteNumberDone
  };
};

const useNumbersIds = (numbers = []) => {
  return useMemo(() => {
    return numbers.map((number) => number.id);
  }, [numbers]);
};

const Page = () => {
  const numbersSearch = useNumbersSearch();
  const numbersStore = useNumbersStore(numbersSearch.state);
  const numbersIds = useNumbersIds(numbersStore.numbers);
  const numbersSelection = useSelection(numbersIds);
  const { t } = useTranslation();
  const { user } = useAuth();

  const setPaymentCompleted = async (result, data) => {
    if (result) {
      console.log('>>> paymentCompleted >>> ');
      try {
        await numbersApi.filterNumbers(user.id);
        numbersStore.handleNumbersGet();
        toast.success('success');
      } catch (err) {
        console.log('err >>>', err);
      }
    } else {
      console.log('>>> payment failed >>> ');
      toast.error(data.message);
    }
    setOpenCardPayment(false);

    // toast.success('Payment successful');
    // setOpenCardPayment(false);
    // setOpenCryptoPayment(false);
    // setTicketPrice(new_ticket_price);
  }

  const handleFilter = async () => {
    // if (numbersStore.unfiltered == 0)
    //   return;
    setOpenCardPayment(true);
    // try {
    //   const response = await numbersApi.filterNumbers();
    //   if (response.success) {
    //     numbersStore.handleNumbersGet(true);
    //   }
    // } catch (err) {

    // }
  };

  const [openCardPayment, setOpenCardPayment] = useState(false);

  const handlePaymentClose = () => {
    setOpenCardPayment(false);
  }

  const handleProcessResult = (result) => {
    setOpenCardPayment(false);
  }
  usePageView();

  return (
    <>
      <Seo title="Dashboard: Number List" />
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
                <Typography variant="h4">{t(tokens.nav.numbers)}</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  {/* <Button
                    color="inherit"
                    size="small"
                    href="/dashboard/import-numbers"
                    startIcon={
                      <SvgIcon>
                        <Upload01Icon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <Download01Icon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button> */}
                </Stack>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
				href="/dashboard/import-numbers"
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  {t(tokens.common.add)}
                </Button>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1} direction="row" alignItems="center" sx={{ ml: 2}}>
                <Typography variant="h6">{t(tokens.client.numbers.unfilteredNumbers)}</Typography>
                <Typography variant="h5">{numbersStore.unfiltered}</Typography>
                <Button
                  startIcon={
                    <SvgIcon>
                      <FilterFunnel01 />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleFilter}
                >
                  {t(tokens.client.numbers.filterLandlineMobile)}
                </Button>
              </Stack>
            </Stack>
            <Card>
              <NumberListSearch
                onFiltersChange={numbersSearch.handleFiltersChange}
                onSortChange={numbersSearch.handleSortChange}
                sortBy={numbersSearch.state.sortBy}
                sortDir={numbersSearch.state.sortDir}
              />
              <NumberListTable
                count={numbersStore.numbersCount}
                items={numbersStore.numbers}
                onDeselectAll={numbersSelection.handleDeselectAll}
                onDeselectOne={numbersSelection.handleDeselectOne}
                onPageChange={numbersSearch.handlePageChange}
                onRowsPerPageChange={numbersSearch.handleRowsPerPageChange}
                onSelectAll={numbersSelection.handleSelectAll}
                onSelectOne={numbersSelection.handleSelectOne}
                page={numbersSearch.state.page}
                rowsPerPage={numbersSearch.state.rowsPerPage}
                selected={numbersSelection.selected}
                onDeleteDone={numbersStore.onDeleteNumberDone}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
      <CreditCardPayment
          amount={numbersStore.unfiltered * user.smsCost}
          processResult={handleProcessResult}
          openPayment={openCardPayment}
          setPaymentCompleted={setPaymentCompleted}
          paymentDescription={`${t(tokens.client.numbers.filterPopupPart1)} ${numbersStore.unfiltered} * $${user.smsCost} = $${(numbersStore.unfiltered*user.smsCost).toFixed(1)} ${t(tokens.client.numbers.filterPopupPart2)}`}
          payButtonText={t(tokens.client.numbers.payAndProceed)}
          dialogTitle={t(tokens.client.numbers.filterPopupTitle)}
          onClose={handlePaymentClose} />
    </>
  );
};

export default Page;
