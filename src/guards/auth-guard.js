import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "src/hooks/use-auth";
import { useRouter } from "src/hooks/use-router";
import { paths } from "src/paths";
import { Issuer } from "src/utils/auth";
import { withAuthGuard } from "src/hocs/with-auth-guard";

const loginPaths = paths.auth.login;

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [checked, setChecked] = useState(false);
  // console.log(">>> isAuthenciated >>>", isAuthenticated);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      // console.log("nati", user, isAuthenticated);
      // const searchParams = new URLSearchParams({
      //   returnTo: window.location.href,
      // }).toString();
      // const href = loginPaths + `?${searchParams}`;
      // router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(
    () => {
      check();
    },
    
    [check]
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
