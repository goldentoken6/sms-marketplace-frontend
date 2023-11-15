import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useUpdateEffect } from "src/hooks/use-update-effect";
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";


export const NumberListSearch = (props) => {
  const { t } = useTranslation();

  const tabs = [
    {
      label: t(tokens.client.numbers.all),
      value: "all",
    },
    {
      label: t(tokens.client.numbers.subscribed),
      value: "subscribed",
    },
    {
      label: t(tokens.client.numbers.unsubscribed),
      value: "unsubscribed",
    },
    {
      label: t(tokens.client.numbers.mobile),
      value: "mobile",
    },
    {
      label: t(tokens.client.numbers.landline),
      value: "landline",
    },
  ];

  const sortOptions = [
    {
      label: "Last update (newest)",
      value: "updatedAt|desc",
    },
    {
      label: "Last update (oldest)",
      value: "updatedAt|asc",
    },
    {
      label: "Total orders (highest)",
      value: "totalOrders|desc",
    },
    {
      label: "Total orders (lowest)",
      value: "totalOrders|asc",
    },
  ];

  const { onFiltersChange, onSortChange, sortBy, sortDir } = props;
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("all");
  const [filters, setFilters] = useState({});

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
    setFilters((prevState) => {
      const updatedFilters = {
        ...prevState,
        subscribed: undefined,
        unsubscribed: undefined,
        landline: undefined,
        mobile: undefined,
      };

      if (value !== "all") {
        updatedFilters[value] = true;
      }

      return updatedFilters;
    });
  }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  }, []);

  const handleSortChange = useCallback(
    (event) => {
      const [sortBy, sortDir] = event.target.value.split("|");

      onSortChange?.({
        sortBy,
        sortDir,
      });
    },
    [onSortChange]
  );

  return (
    <>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 3 }}
      >
        <Box component="form" onSubmit={handleQueryChange} sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder={t(tokens.client.numbers.searchNumbers)}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
        {/* <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={`${sortBy}|${sortDir}`}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField> */}
      </Stack>
    </>
  );
};

NumberListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(["asc", "desc"]),
};
