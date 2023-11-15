import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chip, SvgIcon } from "@mui/material";
import BarChartSquare02Icon from "src/icons/untitled-ui/duocolor/bar-chart-square-02";
import CurrencyBitcoinCircleIcon from "src/icons/untitled-ui/duocolor/currency-bitcoin-circle";
import HomeSmileIcon from "src/icons/untitled-ui/duocolor/home-smile";
import LineChartUp04Icon from "src/icons/untitled-ui/duocolor/line-chart-up-04";
import Mail03Icon from "src/icons/untitled-ui/duocolor/mail-03";
import Mail04Icon from "src/icons/untitled-ui/duocolor/mail-04";
import { tokens } from "src/locales/tokens";
import { paths } from "src/paths";

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.overview),
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.numbers),
            path: paths.dashboard.numbers.index,
            icon: (
              <SvgIcon fontSize="small">
                <LineChartUp04Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.importNumbers),
            path: paths.dashboard.importNumbers,
            icon: (
              <SvgIcon fontSize="small">
                <BarChartSquare02Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.sendSMS),
            path: paths.dashboard.sendSMS,
            icon: (
              <SvgIcon fontSize="small">
                <Mail03Icon />
              </SvgIcon>
            ),
            // label: <Chip color="primary" label="New" size="small" />,
          },
          {
            title: t(tokens.nav.smsHistory),
            path: paths.dashboard.smsHistory,
            icon: (
              <SvgIcon fontSize="small">
                <Mail04Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.paymentMethod),
            path: paths.dashboard.paymentMethod,
            icon: (
              <SvgIcon fontSize="small">
                <CurrencyBitcoinCircleIcon />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, [t]);
};
