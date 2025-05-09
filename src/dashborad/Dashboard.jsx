import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Chart from './Chart';
import TotalOrder from './TotalOrder';
import Orders from './Orders';
import TotalRevenue from './Revenue';
import TopNoodleMenus from './NoodleOrder';
import NoodleTypeStats from './OrderNoodleType';
import SoupStats from './OrderSoup';
import MeatStats from './OrderMeat';
import SizeStats from './OrderSize';
import { Navbarow } from '../owner/Navbarowcomponent/navbarow/index-ow';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const defaultTheme = createTheme({});

export default function Dashboard() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [tempStartDate, setTempStartDate] = React.useState(null);
  const [tempEndDate, setTempEndDate] = React.useState(null);
  const [filterType, setFilterType] = React.useState('');

  const getDateRange = (type) => {
    const today = new Date();
    const format = (d) => d.toISOString().split('T')[0];

    let start, end;
    switch (type) {
      case 'today':
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        start = todayStart.toISOString();
        end = todayEnd.toISOString();
        break;
      case 'week':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        start = format(startOfWeek);
        end = format(endOfWeek);
        break;
      case 'month':
        start = format(new Date(today.getFullYear(), today.getMonth(), 1));
        end = format(new Date(today.getFullYear(), today.getMonth() + 1, 0));
        break;
      case 'year':
        start = format(new Date(today.getFullYear(), 0, 1));
        end = format(new Date(today.getFullYear(), 11, 31));
        break;
      default:
        start = tempStartDate;
        end = tempEndDate;
    }

    return { start, end };
  };

  const FilterDate = () => {
    const { start, end } = getDateRange(filterType);
    setStartDate(start);
    setEndDate(end);
  };

  const gridItems = React.useMemo(() => (
    <>
      <Grid item xs={12} md={6} lg={7}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 380,
            boxShadow: (theme) => theme.shadows[3],
            borderRadius: 2,
          }}
        >
          <Chart startDate={startDate} endDate={endDate} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 380,
            boxShadow: (theme) => theme.shadows[3],
            borderRadius: 2,
          }}
        >
          <NoodleTypeStats startDate={startDate} endDate={endDate} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 380,
            boxShadow: (theme) => theme.shadows[3],
            borderRadius: 2,
          }}
        >
          <MeatStats startDate={startDate} endDate={endDate} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 380,
            boxShadow: (theme) => theme.shadows[3],
            borderRadius: 2,
          }}
        >
          <SoupStats startDate={startDate} endDate={endDate} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 380,
            boxShadow: (theme) => theme.shadows[3],
            borderRadius: 2,
          }}
        >
          <SizeStats startDate={startDate} endDate={endDate} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 200,
            boxShadow: (theme) => theme.shadows[3],
            borderRadius: 2,
          }}
        >
          <TotalOrder startDate={startDate} endDate={endDate} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 200,
            boxShadow: (theme) => theme.shadows[3],
            borderRadius: 2,
          }}
        >
          <TotalRevenue startDate={startDate} endDate={endDate} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 300,
            boxShadow: (theme) => theme.shadows[3],
            borderRadius: 2,
          }}
        >
          <Orders startDate={startDate} endDate={endDate} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 300,
            boxShadow: (theme) => theme.shadows[3],
            borderRadius: 2,
          }}
        >
          <TopNoodleMenus startDate={startDate} endDate={endDate} />
        </Paper>
      </Grid>
    </>
  ), [startDate, endDate]);

  return (
    <div>
      <Navbarow />
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            pb: 4
          }}
        >
          <h1
            style={{
              color: 'orange',
              textShadow: '1px 1.5px 1px rgba(0, 0, 0, 0.5)',
              fontFamily: 'Kanit, sans-serif',
              fontSize: '2.5rem',
              textAlign: 'center',
              padding: '15px 0',
              margin: '15px 0',
              letterSpacing: '1px'
            }}
          >
            รายงานสรุปข้อมูลเตี๋ยวเรือล้านช้าง
          </h1>

          <Container maxWidth="xl">
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                m: '0 auto',
                mb: 4,
                gap: 2,
                backgroundColor: 'white',
                padding: 3,
                width: 'fit-content',
                borderRadius: 2,
              }}
            >
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>ช่วงเวลา</InputLabel>
                <Select
                  value={filterType}
                  label="ช่วงเวลา"
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <MenuItem value="">กำหนดเอง</MenuItem>
                  <MenuItem value="today">วันนี้</MenuItem>
                  <MenuItem value="week">สัปดาห์นี้</MenuItem>
                  <MenuItem value="month">เดือนนี้</MenuItem>
                  <MenuItem value="year">ปีนี้</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="วันที่เริ่มต้น"
                type="date"
                value={tempStartDate || ''}
                onChange={(e) => setTempStartDate(e.target.value || null)}
                InputLabelProps={{ shrink: true }}
                disabled={filterType !== ''}
              />
              <TextField
                label="วันที่สิ้นสุด"
                type="date"
                value={tempEndDate || ''}
                onChange={(e) => setTempEndDate(e.target.value || null)}
                InputLabelProps={{ shrink: true }}
                disabled={filterType !== ''}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={FilterDate}
                startIcon={<FilterAltIcon />}
              >
                กรองข้อมูล
              </Button>
            </Box>
            <Grid container spacing={3}>
              {gridItems}
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
}