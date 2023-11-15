import { useRoutes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./locales/i18n";
import { SettingsConsumer, SettingsProvider } from "./contexts/settings";
import { createTheme } from "./theme";
import { AuthConsumer, AuthProvider } from "./contexts/auth/auth-context";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "./components/toaster";
import CssBaseline from "@mui/material/CssBaseline";
import { routes } from "./routes";
import { useNprogress } from "./hooks/use-nprogress";

export const App = () => {
  useNprogress();

  const element = useRoutes(routes);

  return (
    <ReduxProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <AuthConsumer>
            {(auth) => (
              <SettingsProvider>
                <SettingsConsumer>
                  {(settings) => {
                    if (!settings.isInitialized) {
                      // return null;
                    }
                    const theme = createTheme({
                      colorPreset: settings.colorPreset,
                      contrast: settings.contrast,
                      direction: settings.direction,
                      paletteMode: settings.paletteMode,
                      responsiveFontSizes: settings.responsiveFontSizes,
                    });

                    const showSplash = !auth.isInitialized;

                    return (
                      <ThemeProvider theme={theme}>
                        <Helmet>
                          <meta
                            name="color-scheme"
                            content={settings.paletteMode}
                          />
                          <meta
                            name="theme-color"
                            content={theme.palette.neutral[900]}
                          />
                        </Helmet>
                        <CssBaseline />
                        {element}
                        <Toaster />
                      </ThemeProvider>
                    );
                  }}
                </SettingsConsumer>
              </SettingsProvider>
            )}
          </AuthConsumer>
        </AuthProvider>
      </LocalizationProvider>
    </ReduxProvider>
  );
};
