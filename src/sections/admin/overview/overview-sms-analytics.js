import PropTypes from "prop-types";
import { Box, Card, CardHeader, Tab, Tabs } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart4 } from "src/components/charts/chart-4";
import { useTranslation } from 'react-i18next';
import { tokens } from "src/locales/tokens";

const useChartOptions = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return {
    chart: {
      background: "transparent",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.mode === "dark"
        ? theme.palette.primary.darkest
        : theme.palette.primary.light,
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      labels: {
        colors: theme.palette.text.secondary,
      },
      onItemClick: {
        toggleDataSeries: false,
      },
      onItemHover: {
        highlightDataSeries: false,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "32px",
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}k events`,
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: [
        t(tokens.common.jan),
        t(tokens.common.feb),
        t(tokens.common.mar),
        t(tokens.common.apr),
        t(tokens.common.may),
        t(tokens.common.jun),
        t(tokens.common.jul),
        t(tokens.common.aug),
        t(tokens.common.sep),
        t(tokens.common.oct),
        t(tokens.common.nov),
        t(tokens.common.dec),
      ],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };
};

export const OverviewSMSAnalytics = (props) => {
  const { chartSeries } = props;
  const chartOptions = useChartOptions();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        // subheader="Based on the selected period"
        title={t(tokens.common.smsUsageAnalytics)}
        // action={
        //   <Tabs value="year">
        //     <Tab label="Month" value="month" />
        //     <Tab label="Week" value="week" />
        //   </Tabs>
        // }
      />
      <Box>
        <Chart4 chartSeries={chartSeries}/>
      </Box>
    </Card>
  );
};

OverviewSMSAnalytics.propTypes = {
  chartSeries: PropTypes.array.isRequired,
};
