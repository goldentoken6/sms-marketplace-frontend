import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

export const ClientDataManagement = (props) => (
  <Card {...props}>
    <CardHeader title="Data Management" />
    <CardContent sx={{ pt: 0 }}>
      <Button color="error" variant="outlined">
        Delete Account
      </Button>
      <Box sx={{ mt: 1 }}>
        <Typography color="text.secondary" variant="body2">
          Remove this client
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
