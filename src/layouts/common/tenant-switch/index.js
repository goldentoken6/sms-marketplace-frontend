import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { Box, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';
import { TenantPopover } from './tenant-popover';
import { useTranslation } from 'react-i18next';
import { tokens } from "src/locales/tokens";

const tenants = ['Devias', 'Acme Corp'];

export const TenantSwitch = (props) => {
  const popover = usePopover();
  const { t } = useTranslation();

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="inherit"
            variant="h6"
          >
            {t(tokens.project.title)}
          </Typography>
          <Typography
            color="neutral.400"
            variant="body2"
          >
            {t(tokens.project.release)}
          </Typography>
        </Box>
        {/* <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
        >
          <SvgIcon sx={{ fontSize: 16 }}>
            <ChevronDownIcon />
          </SvgIcon>
        </IconButton> */}
      </Stack>
      {/* <TenantPopover
        anchorEl={popover.anchorRef.current}
        onChange={popover.handleClose}
        onClose={popover.handleClose}
        open={popover.open}
        tenants={tenants}
      /> */}
    </>
  );
};

TenantSwitch.propTypes = {
  sx: PropTypes.object
};
