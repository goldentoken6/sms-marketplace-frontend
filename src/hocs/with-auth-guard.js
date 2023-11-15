import { AuthGuard } from "src/guards/auth-guard";

export const withAuthGuard = (Component) => (props) => {
  return (
    <AuthGuard>
      <Component {...props} />
    </AuthGuard>
  );
};
