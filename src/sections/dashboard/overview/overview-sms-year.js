import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { paths } from "src/paths";
import { useTranslation } from 'react-i18next';
import { tokens } from "src/locales/tokens";

export const OverviewSMSYear = (props) => {
  const { amount } = props;
  const { t } = useTranslation();

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3,
        }}
      >
        <div>
          <img src="/assets/iconly/iconly-glass-paper.svg" width={48} />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color="text.secondary" variant="body2">
            <strong>{t(tokens.common.sms)}</strong> / {t(tokens.common.year)}
          </Typography>
          <Typography color="text.primary" variant="h4">
            {amount}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Button
          href={paths.dashboard.smsHistory}
          color="inherit"
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
        >
          {t(tokens.common.seeAllSMS)}
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewSMSYear.propTypes = {
  amount: PropTypes.number.isRequired,
};
