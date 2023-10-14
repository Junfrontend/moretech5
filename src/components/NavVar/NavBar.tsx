import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ExploreIcon from '@mui/icons-material/Explore';
import {
  Stack,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Popover from '@mui/material/Popover';
import CloseIcon from '@mui/icons-material/Close';
import {
  setUserLocation,
  setUserLocationWatchId,
} from '../../redux/UserLocationSlice/UserLocationSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useState } from 'react';

export enum ServiceEnum {
  CARD_SERVICE = 'cardsService',
  CREDIT_SERVICE = 'creditService',
  MORTGAGE_SERVICE = 'mortgageService',
  CAR_CREDIT_SERVICE = 'carCreditService',
  DEPOSIT_SERVICE = 'depositsService',
}

const NavBar = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [serviceType, setServiceType] = useState<ServiceEnum | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'link-filter' : undefined;

  const handleUserGeoReceive = (position: any) => {
    dispatch(
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  const handleUserGeoRequest = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(handleUserGeoReceive);

      const userLocationWatchId =
        navigator.geolocation.watchPosition(handleUserGeoReceive);
      dispatch(setUserLocationWatchId(userLocationWatchId));
    } else {
      alert('Гео недоступно');
    }
  };

  return (
    <AppBar
      position='fixed'
      sx={{ top: 'auto', bottom: 0, backgroundColor: '#FFF' }}
    >
      <Toolbar>
        <Stack
          justifyContent={'space-between'}
          alignItems={'center'}
          direction={'row'}
          width={'100%'}
        >
          <IconButton onClick={handleOpen}>
            <TuneIcon
              sx={{
                color: '#000',
              }}
            />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{ position: 'absolute', right: '0' }}
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ padding: '20px', paddingTop: '35px' }}>
              <Box
                sx={{
                  marginBottom: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant='h5'
                  component='p'
                  sx={{ marginBottom: '10px' }}
                >
                  Показать только:
                </Typography>

                {/* <FormControlLabel
                  control={
                    <Checkbox
                      value={category}
                      checked={checkedCategories.includes(category)}
                      onChange={handleChangeCheckboxCategory}
                    />
                  }
                  label={category}
                /> */}
              </Box>
              <Box>
                <Typography variant='h6' component='p'>
                  Услуга:
                </Typography>
                <RadioGroup
                  aria-labelledby='price-sort-radio-buttons'
                  value={serviceType}
                  name='service-filter-radio-buttons'
                  onChange={(evt) =>
                    setServiceType(evt.target.value as ServiceEnum)
                  }
                >
                  <FormControlLabel
                    value={ServiceEnum.CAR_CREDIT_SERVICE}
                    control={<Radio />}
                    label='Автокредит'
                  />
                  <FormControlLabel
                    value={ServiceEnum.DEPOSIT_SERVICE}
                    control={<Radio />}
                    label='Вклады и счета'
                  />
                  <FormControlLabel
                    value={ServiceEnum.MORTGAGE_SERVICE}
                    control={<Radio />}
                    label='Ипотека'
                  />
                  <FormControlLabel
                    value={ServiceEnum.CARD_SERVICE}
                    control={<Radio />}
                    label='Карты'
                  />
                  <FormControlLabel
                    value={ServiceEnum.CREDIT_SERVICE}
                    control={<Radio />}
                    label='Кредиты'
                  />
                </RadioGroup>
              </Box>
            </Box>
          </Popover>
          <IconButton
            sx={{
              backgroundColor: '#165BC6',
              borderRadius: '12px',
              position: 'relative',
              bottom: '20px',
              margin: '0 auto',
            }}
          >
            <SearchIcon
              sx={{
                color: '#FFF',
              }}
            />
          </IconButton>
          <IconButton onClick={handleUserGeoRequest}>
            <ExploreIcon
              sx={{
                color: '#000',
              }}
            />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
