import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { numbersApi } from "src/api/numbers";
import { useMounted } from "src/hooks/use-mounted";

const emailOptions = [
  "Resend last invoice",
  "Send password reset",
  "Send verification",
];

const useEmails = () => {
  const isMounted = useMounted();
  const [emails, setEmails] = useState([]);

  const handleEmailsGet = useCallback(async () => {
    try {
      const response = await numbersApi.getEmails();

      if (isMounted()) {
        setEmails(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleEmailsGet();
    },
    
    []
  );

  return emails;
};

export const NumberEmailsSummary = (props) => {
  const [emailOption, setEmailOption] = useState(emailOptions[0]);
  const emails = useEmails();

  return (
    <Card {...props}>
      <CardHeader title="Emails" />
      <CardContent sx={{ pt: 0 }}>
        <TextField
          name="option"
          onChange={(event) => setEmailOption(event.target.value)}
          select
          SelectProps={{ native: true }}
          sx={{
            width: 320,
            maxWidth: "100%",
          }}
          variant="outlined"
          value={emailOption}
        >
          {emailOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <Box sx={{ mt: 2 }}>
          <Button
            endIcon={
              <SvgIcon>
                <ArrowRightIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Send email
          </Button>
        </Box>
      </CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mail Type</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emails.map((email) => {
            const createdAt = format(email.createdAt, "dd/MM/yyyy | HH:mm");

            return (
              <TableRow
                key={email.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Typography variant="subtitle2">
                    {email.description}
                  </Typography>
                </TableCell>
                <TableCell>{createdAt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};
