import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { OfficeChars } from '../OfficeChars/OfficeChars';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const chars = [
  {
    day: 0,
    count: 21,
  },
  {
    day: 1,
    count: 16,
  },
  {
    day: 2,
    count: 16,
  },
  {
    day: 3,
    count: 17,
  },
  {
    day: 4,
    count: 15,
  },
  {
    day: 5,
    count: 22,
  },
  {
    day: 6,
    count: 17,
  },
];

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OfficeTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Физ лицам' {...a11yProps(0)} />
          <Tab label='Юр лицам' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <OfficeChars chars={chars} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OfficeChars chars={chars} />
      </CustomTabPanel>
    </Box>
  );
}
