import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Container,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function SoupManagement() {
    const [soupData, setSoupData] = useState({ soup: '', price: '' });
    const [soups, setSoups] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSoups();
    }, []);

    const fetchSoups = async () => {
        try {
            const response = await fetch('https://lanchangbackend-production.up.railway.app/soups');
            const data = await response.json();
            setSoups(data);
        } catch (error) {
            console.error('Error fetching soups:', error);
        }
    };

    const handleSoupChange = (e) => {
        const { name, value } = e.target;
        setSoupData({ ...soupData, [name]: value });
    };

    const handleSubmitSoup = async (e) => {
        e.preventDefault();
        if (!soupData.soup) {
            alert('กรุณาพิมพ์ชนิดซุป');
            return;
        }
        
        if (!soupData.price || isNaN(soupData.price)) {
            alert('กรุณาใส่ราคาที่ถูกต้อง');
            return;
        }

        const isDuplicate = soups.some(item => 
            item.Soup_name.toLowerCase() === soupData.soup.toLowerCase()
        );
        
        if (isDuplicate) {
            alert('ขนาดนี้มีอยู่แล้ว กรุณาพิมพ์ขนาดใหม่');
            return;
        }

        try {
            const response = await fetch('https://lanchangbackend-production.up.railway.app/addsoup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    soup: soupData.soup,
                    soupprice: parseInt(soupData.price)
                })
            });
    
            const data = await response.json();
            if (response.status === 409) {
                alert('ชนิดซุปนี้มีอยู่แล้ว กรุณาพิมพ์ชนิดซุปใหม่');
            } else if (response.ok) {
                if (data.status === 'ok') {
                    alert('เพิ่มซุปสำเร็จ');
                    setSoupData({ soup: '', price: '' });
                    fetchSoups();
                } else {
                    alert('เกิดข้อผิดพลาดในการเพิ่มซุป: ' + data.message);
                }
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการเพิ่มซุป');
        }
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;
    
        try {
            const response = await fetch(`https://lanchangbackend-production.up.railway.app/deletesoup/${itemToDelete.Soup_id}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.status === 'ok') {
                    alert('ลบชนิดซุปสำเร็จ');
                    fetchSoups();
                } else {
                    alert('เกิดข้อผิดพลาดในการลบชนิดซุป: ' + data.message);
                }
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการลบชนิดซุป');
        }
    
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const handleEditClick = (item) => {
        setItemToEdit({...item});
        setEditDialogOpen(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setItemToEdit({ ...itemToEdit, [name]: value });
    };

    const handleEditSubmit = async () => {
        if (!itemToEdit) return;

        if (!itemToEdit.Soup_name) {
            alert('กรุณาพิมพ์ชนิดซุป');
            return;
        }
        
        if (!itemToEdit.Soup_price || isNaN(itemToEdit.Soup_price)) {
            alert('กรุณาใส่ราคาที่ถูกต้อง');
            return;
        }

        try {
            const response = await fetch(`https://lanchangbackend-production.up.railway.app/updatesoup/${itemToEdit.Soup_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    soup: itemToEdit.Soup_name,
                    price: parseInt(itemToEdit.Soup_price)
                })
            });

            if (response.ok) {
                alert('แก้ไขชนิดซุปสำเร็จ');
                fetchSoups();
                setEditDialogOpen(false);
                setItemToEdit(null);
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการแก้ไขชนิดซุป');
        }
    };

    return (
        <Container maxWidth="md">
            <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>เพิ่มประเภทซุป</Typography>
            <form onSubmit={handleSubmitSoup}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="เพิ่มประเภทซุป"
                            name="soup"
                            value={soupData.soup}
                            onChange={handleSoupChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="ราคา"
                            name="price"
                            type="number"
                            value={soupData.price}
                            onChange={handleSoupChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            เพิ่มประเภทซุป
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                ประเภทซุปที่มีอยู่
            </Typography>
            <List>
                {soups.map((type) => (
                    <ListItem key={type.Soup_id}>
                        <ListItemText 
                            primary={type.Soup_name} 
                            secondary={`${type.Soup_price} บาท`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => handleEditClick(type)}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDeleteClick(type)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>ยืนยันการลบ</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        คุณแน่ใจหรือไม่ที่จะลบ {itemToDelete?.Soup_name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>ยกเลิก</Button>
                    <Button onClick={handleDeleteConfirm} color="error">ลบ</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            >
                <DialogTitle>แก้ไขประเภทซุป</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} style={{ marginTop: '8px' }}>
                        <Grid item xs={12}>
                            <TextField
                                label="ชนิดซุป"
                                name="Soup_name"
                                value={itemToEdit?.Soup_name || ''}
                                onChange={handleEditChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="ราคา"
                                name="Soup_price"
                                type="number"
                                value={itemToEdit?.Soup_price || ''}
                                onChange={handleEditChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>ยกเลิก</Button>
                    <Button onClick={handleEditSubmit} color="primary">บันทึก</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default SoupManagement;