import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { tokens } from "src/locales/tokens";

export const Seo = (props) => {
  const { title } = props;
  const { t } = useTranslation();

  const fullTitle = title
    ? title + ' | ' + t(tokens.project.title) : t(tokens.project.title);

  return (
    <Helmet>
      <title>
        {fullTitle}
      </title>
    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string
};
