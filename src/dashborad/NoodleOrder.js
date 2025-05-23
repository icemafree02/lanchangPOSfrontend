import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

export default function TopNoodleMenus({ startDate, endDate }) {
  const [topNoodleMenus, setTopNoodleMenus] = useState([]);

  useEffect(() => {
    fetchTopNoodleMenus();
  }, [startDate, endDate]);
  

  const fetchTopNoodleMenus = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);

      const response = await fetch(`https://lanchangbackend-production.up.railway.app/getTopNoodleMenus?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTopNoodleMenus(data);
    } catch (error) {
      console.error('Error fetching top noodle menus:', error);
      setTopNoodleMenus([]);
    }
  };

  return (
    <React.Fragment>
      <Title>ก๋วยเตี๋ยวที่สั่งมากที่สุด</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 20, color: "#FF4D00" }}>ชื่อก๋วยเตี๋ยว</TableCell>
            <TableCell align="right">จำนวน</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topNoodleMenus.map((menu, index) => (
            <TableRow key={index}>
              <TableCell>{menu.menu_name}</TableCell>
              <TableCell align="right">{menu.total_quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}