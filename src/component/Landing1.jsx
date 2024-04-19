import React from 'react';
import {
  Box,
  Grid,
  Stack,
  IconButton,
  Typography,
  Button,
  ButtonBase,
  Divider,
} from '@mui/material';
import ThemeProvider from './theme';
import { ArrowRight, List } from '@phosphor-icons/react';
// import Button from '../theme/overrides/Button';
import useResponsive from '../hooks/useResponsive';
import Lingkaran from './assets/img/Lingkaran.png';
import VISA from './assets/img/Visa_logo.png';
import MASTERCARD from './assets/img/Mastercard_logo.png';
import PAYPAL from './assets/img/Paypal_logo.png';
import Blob from './assets/img/blob.svg';
import CC from './assets/img/Card.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const handleSignin = () => {
    navigate('/user/login');
  };

  const handleSignup = () => {
    navigate('/user/signup');
  };

  const isDesktop = useResponsive('up', 'md');
  return (
    <Grid container spacing={2}>
      <Grid item md={4} xs={6}>
        <Stack direction="row" alignItems={'center'} spacing={2}>
          {!isDesktop && (
            <IconButton>
              <List />
            </IconButton>
          )}

          <Typography variant="h5">ExpenseManager</Typography>
        </Stack>
      </Grid>
      {isDesktop && (
        <Grid item md={4} container justifyContent="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button>About us</Button>
            <Button>Conatct us</Button>
          </Stack>
        </Grid>
      )}

      <Grid item md={4} xs={6} container justifyContent={'flex-end'}>
        <Stack direction="row" alignItems="center" spacing={2} container>
          <Button onClick={() => handleSignin()}>Sign In</Button>
          <Button
            variant="contained"
            sx={{ borderRadius: 0 }}
            onClick={() => handleSignup()}
          >
            Sign up
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

function HeroSection() {
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate('/user/login');
  };
  const LeftContent = (
    <Grid
      sx={{ flexGrow: 1 }}
      item
      container
      md={6}
      xs={12}
      justifyContent="center"
      alignItems="center"
    >
      <img
        src={Lingkaran}
        style={{
          position: 'absolute',
          opacity: 0.6,
          left: -60,
          zIndex: 1,
        }}
      />
      <Stack spacing={8} sx={{ zIndex: 10 }}>
        <Stack spacing={2}>
          <Typography variant="h1" sx={{ lineHeight: 1.2, fontWeight: 700 }}>
            {/* Trade Stocks <br /> earn bonuses <br /> shares. Enjoy. */}
            Manage Your <br /> Expenses <br /> Effortlessly
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography sx={{ fontSize: 20 }}>
              {/* Being in control of your funds is the <br />
              same as owning life. we help you <br />
              effectively manage your portfolio. */}
              <Typography sx={{ fontSize: 20 }}>
                Take control of your finances with Expense Manager. <br />
                Track your spending, set budgets, and achieve <br />
                your financial goals with ease.
              </Typography>
            </Typography>
            <Box sx={{ p: 1, bgcolor: theme => theme.palette.common.black }}>
              <IconButton onClick={() => handleSignin()}>
                <ArrowRight />
              </IconButton>
            </Box>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" spacing={4}>
          <img src={VISA} style={{ height: 30, filter: 'saturate(0%)' }} />
          <img
            src={MASTERCARD}
            style={{ height: 40, filter: 'saturate(0%)' }}
          />
          <img src={PAYPAL} style={{ height: 50, filter: 'saturate(0%)' }} />
        </Stack>
      </Stack>
    </Grid>
  );

  const RightContent = (
    <Grid
      sx={{ flexGrow: 1 }}
      item
      container
      md={6}
      xs={12}
      justifyContent="center"
      alignItems="center"
      sx={{
        flexGrow: 1,
        position: 'relative',
      }}
    >
      <img
        src={Blob}
        style={{
          position: 'absolute',
          bottom: -100,
          left: '50%',
          transform: 'translate(-50%, -30%)',
          width: '600px',
          height: '500px',
        }}
      />
      <Stack>
        <Box sx={{ transform: 'rotate3d(0, 0, 1, -40deg)' }}>
          <img src={CC} style={{ height: '60%' }} />
        </Box>
        <Box sx={{ transform: 'rotate3d(1, 1, 0.5, -60deg)' }}>
          <img src={CC} style={{ height: '60%' }} />
        </Box>
      </Stack>
    </Grid>
  );

  return (
    <Grid container spacing={{ xs: 15, md: 2 }} sx={{ flexGrow: 1 }}>
      {LeftContent}
      {RightContent}
    </Grid>
  );
}

export const Landing1 = () => {
  return (
    <>
      <ThemeProvider>
        <Box
          sx={{
            minHeight: '100vh',
            p: 4,
            bgcolor: '#fdfaf0',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 4,
          }}
        >
          {/* Header */}
          <Header />
          {/* Hero section */}
          <HeroSection />
        </Box>
      </ThemeProvider>
    </>
  );
};
