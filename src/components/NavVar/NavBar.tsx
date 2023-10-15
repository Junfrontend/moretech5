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
import { useEffect, useState } from 'react';
import { fetchOfficesAction } from '../../redux/UserLocationSlice/asyncActions';
import { PointEnum } from '../../types/office';

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
  const [pointType, setPointType] = useState<PointEnum>(PointEnum.OFFICE);
  const [hasRamp, setHasRamp] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

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

  useEffect(() => {
    if (!isFirstRender) {
      dispatch(
        fetchOfficesAction({
          downLimitLatitude: 50,
          leftLimitLongitude: 40,
          rightLimitLongitude: 30,
          upLimitLatitude: 60,
          pointType,
          serviceType: serviceType ? serviceType : undefined,
          hasRamp: hasRamp ? hasRamp : undefined,
        })
      );
    }
    setIsFirstRender(false);
  }, [serviceType, pointType, hasRamp]);

  const handleChangeHasRamp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasRamp(event.target.checked);
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
            <Box sx={{ padding: '10px', paddingTop: '35px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant='h6' component='p'>
                  Показать только:
                </Typography>

                <RadioGroup
                  aria-labelledby='point-type-filter-radio-buttons'
                  value={pointType}
                  name='point-type-filter-radio-buttons'
                  onChange={(evt) =>
                    setPointType(evt.target.value as PointEnum)
                  }
                >
                  <FormControlLabel
                    value={PointEnum.OFFICE}
                    control={<Radio />}
                    label='Офисы'
                  />
                  <FormControlLabel
                    value={PointEnum.ATM}
                    control={<Radio />}
                    label='Банкоматы'
                  />
                </RadioGroup>
              </Box>
              {pointType === PointEnum.OFFICE && (
                <Box>
                  <Typography variant='h6' component='p'>
                    Услуга:
                  </Typography>
                  <RadioGroup
                    aria-labelledby='service-filter-radio-buttons'
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
              )}
              {pointType === PointEnum.OFFICE && (
                <Box>
                  <Typography variant='h6' component='p'>
                    Дополнительно:
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={hasRamp}
                        checked={hasRamp}
                        onChange={handleChangeHasRamp}
                      />
                    }
                    label='Пандус'
                  />
                </Box>
              )}
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
