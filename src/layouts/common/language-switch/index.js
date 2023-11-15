import { useTranslation } from "react-i18next";
import { Box, IconButton, Tooltip } from "@mui/material";
import { usePopover } from "src/hooks/use-popover";
import { LanguagePopover } from "./language-popover";

const languages = {
  en: "/assets/flags/flag-uk.svg",
  fr: "/assets/flags/flag-fr.svg",
  es: "/assets/flags/flag-es.svg",
};

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const popover = usePopover();

  const flag = languages[i18n.language];

  return (
    <>
      <Tooltip title="Language">
        <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
          <Box
            sx={{
              width: 28,
              "& img": {
                width: "100%",
              },
            }}
          >
            <img src={flag} />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
