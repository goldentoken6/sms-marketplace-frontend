import PropTypes from "prop-types";
import { Button, Card, CardActions, CardHeader } from "@mui/material";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import { useTranslation } from 'react-i18next';
import { tokens } from "src/locales/tokens";

export const ClientBasicDetails = (props) => {
  const { name, email, smsCount, numbersCount, smsCost, ...other } = props;
  const { t } = useTranslation();

  return (
    <Card {...other}>
      <CardHeader title={t(tokens.admin.basicDetails)} />
      <PropertyList>
        <PropertyListItem divider label={t(tokens.admin.name)} value={name} />
        <PropertyListItem divider label={t(tokens.admin.email)} value={email} />
        <PropertyListItem divider label={t(tokens.admin.smsCount)} value={smsCount} />
        <PropertyListItem divider label={t(tokens.admin.numberCount)} value={numbersCount} />
        <PropertyListItem divider label={t(tokens.common.smsCost)} value={smsCost} />
      </PropertyList>
    </Card>
  );
};

ClientBasicDetails.propTypes = {
  name: PropTypes.string,
  smsCount: PropTypes.number,
  numberCount: PropTypes.number,
  email: PropTypes.string.isRequired,
  smsCost: PropTypes.number,
};
