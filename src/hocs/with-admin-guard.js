import { AdminGuard } from "src/guards/admin-guard";
import { AuthGuard } from "src/guards/auth-guard";

export const withAdminGuard = (Component) => (props) => {
  return (
    <AuthGuard>
      <AdminGuard>
        <Component {...props} />
      </AdminGuard>
    </AuthGuard>
  );
};
