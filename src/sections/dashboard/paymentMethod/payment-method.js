import PropTypes from "prop-types";
import axios from 'axios';
import toast from "react-hot-toast";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
  Button,
} from "@mui/material";

const paymentMethods = [
  {
    label: "Visa Credit/Debit Card",
    value: "visa",
  },
  {
    label: "PayPal",
    value: "paypal",
  },
];

export const CheckoutBilling = (props) => {
  const { billing, onChange, ...other } = props;

  const handleSubmit = async (values, helpers) => {
    // . . .
    console.error("billing = ", billing);

    const response = await axios.post(
      'http://65.21.236.218:2480/setpayment',
      {
        ...billing,
        userid:window.name,        
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if(response.status === 200)
    {
      toast.success("Payment Method saved!");
    }
    else
    {
      toast.error("Something went wrong!");
    }
   };

  return (
    <Stack {...other} spacing={6}>
      <Stack spacing={3}>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Box
            sx={{
              alignItems: "center",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: "flex",
              height: 40,
              justifyContent: "center",
              width: 40,
            }}
          >
            <Typography sx={{ fontWeight: "fontWeightBold" }} variant="h6">
              1
            </Typography>
          </Box>
          <Typography variant="h6">Billing Address</Typography>
        </Stack>
        <div>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                onChange={onChange}
                value={billing.firstName}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={onChange}
                value={billing.lastName}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street Address"
                name="address"
                onChange={onChange}
                value={billing.address}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street Line 2 (optional)"
                name="optionalAddress"
                onChange={onChange}
                value={billing.optionalAddress}
              />
            </Grid>
            <Grid xs={12} sm={3}>
              <TextField
                fullWidth
                label="State"
                name="state"
                onChange={onChange}
                value={billing.state}
              />
            </Grid>
            <Grid xs={12} sm={3}>
              <TextField
                fullWidth
                label="Zip"
                name="zip"
                onChange={onChange}
                value={billing.zip}
              />
            </Grid>
          </Grid>
        </div>
      </Stack>
      <Stack spacing={3}>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Box
            sx={{
              alignItems: "center",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: "flex",
              height: 40,
              justifyContent: "center",
              width: 40,
            }}
          >
            <Typography sx={{ fontWeight: "fontWeightBold" }} variant="h6">
              2
            </Typography>
          </Box>
          <Typography variant="h6">Payment Method</Typography>
        </Stack>
        <div>
          <div>
            <RadioGroup
              name="paymentMethod"
              onChange={onChange}
              sx={{ flexDirection: "row" }}
              value={billing.paymentMethod}
            >
              {paymentMethods.map((paymentMethod) => (
                <FormControlLabel
                  control={<Radio />}
                  key={paymentMethod.value}
                  label={
                    <Typography variant="body1">
                      {paymentMethod.label}
                    </Typography>
                  }
                  value={paymentMethod.value}
                />
              ))}
            </RadioGroup>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name on Card"
                  name="cardOwner"
                  onChange={onChange}
                  value={billing.cardOwner}
                />
              </Grid>
              <Grid sm={6} />
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  onChange={onChange}
                  value={billing.cardNumber}
                />
              </Grid>
              <Grid sm={6} />
              <Grid xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Expire Date"
                  name="cardExpirationDate"
                  onChange={onChange}
                  placeholder="MM/YY"
                  value={billing.cardExpirationDate}
                />
              </Grid>
              <Grid xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Security Code"
                  name="cardSecurityCode"
                  onChange={onChange}
                  value={billing.cardSecurityCode}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button fullWidth size="large" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

CheckoutBilling.propTypes = {
  billing: PropTypes.object,
  onChange: PropTypes.func,
};
