import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img
      src='/logo192.png'
      width={30}
      height={30}
    >
    </img>
  );
};
