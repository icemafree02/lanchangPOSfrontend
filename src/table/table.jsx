import React, { useState, useEffect } from 'react';
import QRCodeGenerator from './QRcode';
import { Navbarow } from '../owner/Navbarowcomponent/navbarow/index-ow';
import {
    Button,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    Box,

} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';


function Table() {
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({ tables_number: '', status_id: '1' });
    const [editTable, setEditTable] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false); // State for delete confirmation
    const [tableToDelete, setTableToDelete] = useState(null);
    //const theme = useTheme();
    //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        fetchTablesAndorder();
    }, []);

    const fetchTablesAndorder = async () => {
        try {
            const response = await fetch('https://lanchangbackend-production.up.railway.app/tableandorder');
            const data = await response.json();
            setTables(data);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    const handleNewTableInputChange = (e) => {
        const { name, value } = e.target;
        setNewTable({ ...newTable, [name]: value });
    };

    const handleEditTableInputChange = (e) => {
        const { name, value } = e.target;
        setEditTable({ ...editTable, [name]: value });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://lanchangbackend-production.up.railway.app/table', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTable),
            });

            if (!response.ok) {
                throw new Error('Failed to create new table');
            }

            setNewTable({ tables_number: '', status_id: '1' });
            fetchTablesAndorder(); // Refresh table list
        } catch (error) {
            console.error('Error creating table:', error);
        }
    };

    console.log(tables)

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://lanchangbackend-production.up.railway.app/table/${editTable.tables_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editTable),
            });

            if (!response.ok) {
                throw new Error('Failed to update table');
            }

            setEditTable(null);
            fetchTablesAndorder(); // Refresh table list
        } catch (error) {
            console.error('Error updating table:', error);
        }
    };

    const handleEdit = (table) => {
        setEditTable({ tables_id: table.tables_id, tables_number: table.tables_number, status_id: table.status_id });
    };

    const handleDelete = async () => {
        try {
            await fetch(`https://lanchangbackend-production.up.railway.app/table/${tableToDelete.tables_id}`, { method: 'DELETE' });
            setConfirmDelete(false);
            setTableToDelete(null);
            fetchTablesAndorder(); // Refresh table list after deleting
        } catch (error) {
            console.error('Error deleting table:', error);
        }
    };

    const createOrderForTable = async (tableId) => {
        try {
            const response = await fetch('https://lanchangbackend-production.up.railway.app/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tableId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const data = await response.json();
            alert(`สร้างออเดอร์เรียบร้อย: Order ID: ${data.orderId}`);
            fetchTablesAndorder();
        } catch (error) {
            console.error('Error creating order:', error);
            alert('เกิดข้อผิดพลาดในการสร้างออเดอร์');
        }
    };


    const openConfirmDeleteDialog = (table) => {
        setTableToDelete(table);
        setConfirmDelete(true);
    };

    const closeConfirmDeleteDialog = () => {
        setTableToDelete(null);
        setConfirmDelete(false);
    };

    return (
        <div style={{ height: '100vh', overflowY: 'auto' }}>
            <Navbarow />
            <Container
                maxWidth="md" sx={{ mt: 4, mb: 4 }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        บริหารจัดการโต๊ะ
                    </Typography>

                    <Paper sx={{ p: 3, width: '100%', mb: 3 }}>
                        <Typography variant="h6" gutterBottom>สร้างโต๊ะใหม่</Typography>
                        <form onSubmit={handleCreateSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="เลขโต๊ะ"
                                        name="tables_number"
                                        value={newTable.tables_number}
                                        onChange={handleNewTableInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>สถานะ</InputLabel>
                                        <Select
                                            name="status_id"
                                            value={newTable.status_id}
                                            onChange={handleNewTableInputChange}
                                            required
                                        >
                                            <MenuItem value="1">ว่าง</MenuItem>
                                            <MenuItem value="2">ไม่ว่าง</MenuItem>
                                            <MenuItem value="0">กำลังเก็บโต๊ะ</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        เพิ่มโต๊ะ
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>

                    {editTable && (
                        <Paper style={{ padding: '20px', marginBottom: '20px', position: 'relative' }}>
                            <IconButton
                                onClick={() => setEditTable(null)}
                                style={{ position: 'absolute', top: '5px', right: '5px' }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" gutterBottom>แก้ไขโต๊ะ</Typography>
                            <form onSubmit={handleEditSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="เลขโต๊ะ"
                                            name="tables_number"
                                            value={editTable.tables_number}
                                            onChange={handleEditTableInputChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>สถานะ</InputLabel>
                                            <Select
                                                name="status_id"
                                                value={editTable.status_id}
                                                onChange={handleEditTableInputChange}
                                                required
                                            >
                                                <MenuItem value="1">ว่าง</MenuItem>
                                                <MenuItem value="2">ไม่ว่าง</MenuItem>
                                                <MenuItem value="0">กำลังเก็บโต๊ะ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary" fullWidth>
                                            เเก้ไขโต๊ะ
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    )}

                    <Paper sx={{ width: '100%', overflow: 'auto' }}>
                        <MuiTable>
                            <TableHead >
                                <TableRow >
                                    <TableCell align="center" sx={{ fontSize: { xs: '13px', sm: '12px', md: '14px' } }} >เลขโต๊ะ</TableCell>
                                    <TableCell align="center" sx={{ fontSize: { xs: '13px', sm: '12px', md: '14px' } }}>สถานะ</TableCell>
                                    <TableCell align="center" sx={{ fontSize: { xs: '13px', sm: '12px', md: '14px' } }}>ออเดอร์ล่าสุด</TableCell>
                                    <TableCell align="center" sx={{ fontSize: { xs: '13px', sm: '12px', md: '14px' } }}>QR Code</TableCell>
                                    <TableCell align="center" sx={{ fontSize: { xs: '13px', sm: '12px', md: '14px' } }}>การจัดการ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tables.map((table) => (
                                    <TableRow key={table.tables_id}>
                                        <TableCell align="center">{table.tables_number}</TableCell>
                                        <TableCell align="center">
                                            {table.status_id === 1 ? "ว่าง" : table.status_id === 2 ? "ไม่ว่าง" : table.status_id === 0 ? "กำลังเก็บโต๊ะ" : ""}
                                        </TableCell>
                                        <TableCell align="center">
                                            {table.latest_order_id ? `Order #${table.latest_order_id}` : 'ไม่มีออเดอร์'}
                                        </TableCell>
                                        <TableCell item key={table.tables_id}>
                                            <QRCodeGenerator tablenumber={table.tables_number} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleEdit(table)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => openConfirmDeleteDialog(table)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => createOrderForTable(table.tables_id)}
                                                sx={{ fontSize: { xs: '13px', sm: '12px', md: '14px' }}}
                                            >
                                                สร้างออเดอร์ใหม่
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </MuiTable>
                    </Paper>

                </Box>

                <Dialog
                    open={confirmDelete}
                    onClose={closeConfirmDeleteDialog}
                >
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ต้องการลบโต๊ะ {tableToDelete?.tables_number} ทิ้งหรือไม่?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeConfirmDeleteDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
}

export default Table;