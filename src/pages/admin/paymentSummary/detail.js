import { useCallback, useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { clientsApi } from "src/api/clients";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { ClientBasicDetails } from "src/sections/admin/client/client-basic-details";
import { getInitials } from "src/utils/get-initials";
import { ClientDataManagement } from "src/sections/admin/client/client-data-management";

const useClient = () => {
  const isMounted = useMounted();
  const [client, setClient] = useState(null);

  const handleClientGet = useCallback(async () => {
    try {
      const response = await clientsApi.getClient();
      if (isMounted()) {
        setClient(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleClientGet();
    },
    
    []
  );

  return client;
};

const Page = () => {
  const client = useClient();
  usePageView();
  if (!client) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Client Details" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
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
                  <Typography variant="subtitle2">Clients</Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Avatar
                    src={client.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  >
                    {getInitials(client.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">{client.email}</Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">user_id:</Typography>
                      <Chip label={client.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    endIcon={
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    }
                    href={paths.admin.clients.edit}
                  >
                    Edit
                  </Button>
                  <Button
                    endIcon={
                      <SvgIcon>
                        <ChevronDownIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Actions
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <div>
              <Grid container spacing={4}>
                <Grid xs={12} lg={4}>
                  <ClientBasicDetails {...client} />
                  <ClientDataManagement />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
