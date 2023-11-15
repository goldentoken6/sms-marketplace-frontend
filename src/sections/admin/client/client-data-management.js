import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { tokens } from "src/locales/tokens";

export const ClientDataManagement = (props) => {
  const { t } = useTranslation();
  return (
      <Card {...props}>
      <CardHeader title={t(tokens.admin.dataManagement)} />
      <CardContent sx={{ pt: 0 }}>
        <Button color="error" variant="outlined" onClick={props.onDeleteClick}>
          {t(tokens.admin.deleteAccount)}
        </Button>
        <Box sx={{ mt: 1 }}>
          <Typography color="text.secondary" variant="body2">
            {t(tokens.admin.removeThisClient)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
};
