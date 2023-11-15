import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { wait } from "src/utils/wait";
import { clientsApi } from "src/api/clients";

export const ClientEditForm = (props) => {
  const { client, ...other } = props;
  const formik = useFormik({
    initialValues: {
      name: client.name || "",
      email: client.email || "",
      smsCost: client.smsCost || 0.0,
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(32).required("Password is required"),
      smsCost: Yup.number().min(0.5).required("SMS Cost is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const updateResult = await clientsApi.updateClient(client.id, {
          name: values.name,
          email: values.email,
          pwd: values.password,
          smsCost: values.smsCost,
        })
        if (updateResult) {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Client updated");
        } else {
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);
          toast.success("Client update failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit Client" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Full name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                name="password"
                type="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.password}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.smsCost && formik.errors.smsCost)}
                fullWidth
                helperText={formik.touched.smsCost && formik.errors.smsCost}
                label="SMS Cost"
                name="smsCost"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.smsCost}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.admin.clients.index}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

ClientEditForm.propTypes = {
  client: PropTypes.object.isRequired,
};
