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
  Select,
  Option,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { wait } from "src/utils/wait";
import { SERVER_URL } from "src/constants";

export const NumberAddForm = (props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      number: "",
      type: "",
      status: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        const response = await axios.post(
          `${SERVER_URL}/create`,
          {
            name:values.name,
            email:values.email,
            pwd:values.password
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
          toast.success("Number added!");
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
        <CardHeader title="Add a Number" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Number"
                name="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={6}></Grid>
            <Grid xs={12} md={6}>
              <Select
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                required
                name="Type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="landline">landline</option>
                <option value="mobile">mobile</option>
              </Select>
            </Grid>

            <Grid xs={12} md={6}>
              <Select
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                required
                name="Status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="subscribed">subscribed</option>
                <option value="unsubscribed">unsubscribed</option>
              </Select>      
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
            Create
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
