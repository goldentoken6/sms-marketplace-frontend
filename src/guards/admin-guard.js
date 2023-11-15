import PropTypes from "prop-types";
import { Error } from "src/components/error";
import { useAuth } from "src/hooks/use-auth";

// This guard protects an auth page from being loaded when using a different issuer.
// For example, if we are using Auth0, and we try to load `/auth/firebase/login` path, this
// will render an error.
export const AdminGuard = (props) => {
  const { children } = props;
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Error statusCode={400} title={`Not Authorized`} />;
  }

  return <>{children}</>;
};

AdminGuard.propTypes = {
  children: PropTypes.any,
  issuer: PropTypes.any,
};
