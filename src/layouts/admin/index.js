import PropTypes from "prop-types";
import { useSettings } from "src/hooks/use-settings";
import { useSections } from "./config";
import { HorizontalLayout } from "../common/horizontal-layout";
import { VerticalLayout } from "../common/vertical-layout";
import { withAdminGuard } from "src/hocs/with-admin-guard";

const AdminDashboardLayout = withAdminGuard((props) => {
  const settings = useSettings();
  const sections = useSections();
  if (settings.layout === "horizontal") {
    return (
      <HorizontalLayout
        sections={sections}
        navColor={settings.navColor}
        {...props}
      />
    );
  }

  return (
    <VerticalLayout
      sections={sections}
      navColor={settings.navColor}
      {...props}
    />
  );
});
export default AdminDashboardLayout;
AdminDashboardLayout.propTypes = {
  children: PropTypes.node,
};
