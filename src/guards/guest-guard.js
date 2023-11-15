import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';

export const GuestGuard = (props) => {
  const { children } = props;
  const { isAuthenticated, user } = useAuth();
  const auth = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace(paths.dashboard.index);
    } else {
      setChecked(false);
    }
  }, [isAuthenticated, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(() => {
      // check();
      if (isAuthenticated) {
        if (user.role == 'admin')
          router.replace(paths.admin.index);
        else 
          router.replace(paths.dashboard.index);
      } else {
        router.replace(paths.auth.index);
        setChecked(true);
      }
    },
    [isAuthenticated]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};
