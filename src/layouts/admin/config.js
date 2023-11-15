import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chip, SvgIcon } from "@mui/material";
import BarChartSquare02Icon from "src/icons/untitled-ui/duocolor/bar-chart-square-02";
import CurrencyBitcoinCircleIcon from "src/icons/untitled-ui/duocolor/currency-bitcoin-circle";
import HomeSmileIcon from "src/icons/untitled-ui/duocolor/home-smile";
import LineChartUp04Icon from "src/icons/untitled-ui/duocolor/line-chart-up-04";
import Mail03Icon from "src/icons/untitled-ui/duocolor/mail-03";
import Mail04Icon from "src/icons/untitled-ui/duocolor/mail-04";
import SettingsIcon from "src/icons/untitled-ui/duocolor/settings";
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
            path: paths.admin.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.clients),
            path: paths.admin.clients.index,
            icon: (
              <SvgIcon fontSize="small">
                <LineChartUp04Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.smsSummary),
            path: paths.admin.smsSummary,
            icon: (
              <SvgIcon fontSize="small">
                <Mail04Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.paymentSummary),
            path: paths.admin.paymentSummary,
            icon: (
              <SvgIcon fontSize="small">
                <CurrencyBitcoinCircleIcon />
              </SvgIcon>
            ),
          },
          // {
          //   title: t(tokens.nav.settings),
          //   path: paths.admin.settings,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       < SettingsIcon/>
          //     </SvgIcon>
          //   ),
          // },
        ],
      },
    ];
  }, [t]);
};
