import { useCallback } from "react";
import PropTypes from "prop-types";
import Attachment01Icon from "@untitled-ui/icons-react/build/esm/Attachment01";
import Expand01Icon from "@untitled-ui/icons-react/build/esm/Expand01";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import Minimize01Icon from "@untitled-ui/icons-react/build/esm/Minimize01";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import {
  Backdrop,
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Paper,
  Portal,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { QuillEditor } from "src/components/quill-editor";

export const MailComposer = (props) => {
  const {
    message = "",
    onClose,
    onMessageChange,
    onSubjectChange,
    onToChange,
    open = false,
    subject = "",
    to = "",
  } = props;

  const handleSubjectChange = useCallback(
    (event) => {
      onSubjectChange?.(event.target.value);
    },
    [onSubjectChange]
  );

  const handleToChange = useCallback(
    (event) => {
      onToChange?.(event.target.value);
    },
    [onToChange]
  );

  if (!open) {
    return null;
  }

  return (
    <>
      <Input
        disableUnderline
        fullWidth
        onChange={handleToChange}
        placeholder="To"
        sx={{
          p: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
        value={to}
      />
      <QuillEditor
        onChange={onMessageChange}
        placeholder="Leave a message"
        sx={{
          border: "none",
          flexGrow: 1,
          innerHeight: "1500px",
          height: "300px",
        }}
        value={message}
      />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <Tooltip title="Attach image">
            <IconButton size="small">
              <SvgIcon>
                <Image01Icon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Attach file">
            <IconButton size="small">
              <SvgIcon>
                <Attachment01Icon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Stack>
        <div>
          <Button variant="contained">Send</Button>
        </div>
      </Stack>
    </>
  );
};

MailComposer.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  onMessageChange: PropTypes.func,
  onSubjectChange: PropTypes.func,
  onToChange: PropTypes.func,
  open: PropTypes.bool,
  subject: PropTypes.string,
  to: PropTypes.string,
};
