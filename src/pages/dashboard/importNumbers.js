import RefreshCcw01Icon from "@untitled-ui/icons-react/build/esm/RefreshCcw01";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { useSettings } from "src/hooks/use-settings";
import { ImportNumberForm } from "src/sections/dashboard/import-number/import-number-form";
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";

const Page = () => {
  const settings = useSettings();
  const { t } = useTranslation();
  usePageView();

  return (
    <>
      <Seo title="Dashboard: Import Numbers" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : "xl"}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">{t(tokens.nav.importNumbers)}</Typography>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12} lg={8}>
              <Box
                sx={{
                  backgroundColor: "background.paper",
                }}
              >
                <ImportNumberForm />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
