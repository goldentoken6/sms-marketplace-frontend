import { useCallback, useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { clientsApi } from "src/api/clients";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { ClientEditForm } from "src/sections/admin/client/client-edit-form";
import { getInitials } from "src/utils/get-initials";
import { ClientCreateForm } from "src/sections/admin/client/client-create-form";
import { useTranslation } from 'react-i18next';
import { tokens } from "src/locales/tokens";

const Page = () => {
  const { t } = useTranslation();

  usePageView();

  return (
    <>
      <Seo title={t(tokens.common.dashboardClientCreate)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.admin.clients.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">{t(tokens.common.clients)}</Typography>
                </Link>
              </div>
            </Stack>
            <ClientCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
