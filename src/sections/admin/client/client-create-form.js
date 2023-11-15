import toast from "react-hot-toast";
import axios from 'axios';

import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from 'src/hooks/use-router';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { wait } from "src/utils/wait";
import { SERVER_URL } from "src/constants";
import { useTranslation } from "react-i18next";
import { tokens } from "src/locales/tokens";

export const ClientCreateForm = (props) => {
  const router = useRouter();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      smscost: 0.0,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(32).required("Password is required"),
      smscost: Yup.number().min(0.5).required("SMS cost is required")
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        const response = await axios.post(
          `${SERVER_URL}/create`,
          {
            name:values.name,
            email:values.email,
            pwd:values.password,
            smscost: values.smscost,
            role:'client'
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if(response.status === 200)
        {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success("Client created!");
        }
        else
        {
          toast.error("Something went wrong!");
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);  
        }
        router.push(paths.admin.clients.index);
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
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title={t(tokens.admin.createClient)} />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label={t(tokens.admin.fullName)}
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
                label={t(tokens.admin.emailAddress)}
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
                label={t(tokens.common.password)}
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
                error={!!(formik.touched.smscost && formik.errors.smscost)}
                fullWidth
                helperText={formik.touched.smscost && formik.errors.smscost}
                label={t(tokens.common.smsCost)}
                name="smscost"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.smscost}
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
            {t(tokens.common.create)}
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.admin.clients.index}
          >
            {t(tokens.common.cancel)}
          </Button>
        </Stack>
      </Card>
    </form>
  );
};
