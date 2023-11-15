import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  SvgIcon
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Chart } from 'src/components/chart'
import { Scrollbar } from 'src/components/scrollbar'
import { useTranslation } from 'react-i18next';
import { tokens } from "src/locales/tokens";

const useChartOptions = () => {
  const theme = useTheme()
  const { t } = useTranslation();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false
    },
    fill: {
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100]
      },
      type: 'gradient'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    markers: {
      size: 6,
      strokeColors: theme.palette.background.default,
      strokeWidth: 3
    },
    stroke: {
      curve: 'smooth'
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
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
        t(tokens.common.dec)
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: value => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  }
}

export const Chart4 = (props) => {
  const chartOptions = useChartOptions()
  const { chartSeries } = props;

  return (
    <Box
      sx={{
        backgroundColor: theme =>
          theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
        p: 3
      }}
    >
      <Card>
        <CardHeader
        // action={(
        //   <IconButton>
        //     <SvgIcon>
        //       <DotsHorizontalIcon />
        //     </SvgIcon>
        //   </IconButton>
        // )}
        // title="Performance Over Time"
        />
        <CardContent>
          <Box
            sx={{
              height: 375,
              minWidth: 500,
              position: 'relative'
            }}
          >
            <Chart
              height={350}
              options={chartOptions}
              series={chartSeries}
              type='area'
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
