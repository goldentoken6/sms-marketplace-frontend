import PropTypes from "prop-types";
import { Button, Card, CardActions, CardHeader } from "@mui/material";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";

export const ClientBasicDetails = (props) => {
  const { name, email, smsCount, numbersCount, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <PropertyList>
        <PropertyListItem divider label="Name" value={name} />
        <PropertyListItem divider label="Email" value={email} />
        <PropertyListItem divider label="SMS Count" value={smsCount} />
        <PropertyListItem divider label="Number Count" value={numbersCount} />
      </PropertyList>
    </Card>
  );
};

ClientBasicDetails.propTypes = {
  name: PropTypes.string,
  smsCount: PropTypes.number,
  numberCount: PropTypes.number,
  email: PropTypes.string.isRequired,
};
