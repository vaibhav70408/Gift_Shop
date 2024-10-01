import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import styles from './Order.module.scss'
import { deleteOrder, getAllOrders, updateOrder } from '../../services/OrderService';
import { Order } from '../../common/types/orderData';
import { useSnackbar } from 'notistack';

export default function Orders() {
    const [rows, setRows] = React.useState<any[]>([]);
    const [originalData, setOriginalData] = React.useState<Order[]>([]);
    const [orderStatus, setOrderStatus] = React.useState('None');
    const [openDialog, setOpenDialog] = React.useState(false);
    const [orderToDelete, setOrderToDelete] = React.useState<string | null>(null);

    const omitCreatedAt = ({ createdAt, ...rest }: any) => rest;
    const { enqueueSnackbar } = useSnackbar();
    const handleChange = (event: SelectChangeEvent<string>, rowId: string) => {
        const newStatusValue = event.target.value;
        setOrderStatus(newStatusValue);
        const orderToUpdate = originalData.find((order) => order.orderId === rowId);
        if (orderToUpdate) {
            const payload = omitCreatedAt(orderToUpdate);
            payload.orderStatus = newStatusValue;
            updateOrder(payload).then((response: any) => {
                enqueueSnackbar('Updated successfully', { variant: 'success', autoHideDuration: 2000 });
                const newRowData = rows.map((row) =>
                    row.orderId === rowId
                        ? { ...row, orderStatus: newStatusValue }
                        : row
                );
                setRows(newRowData);
            }).catch((error) => {
                enqueueSnackbar('Update failed', { variant: 'error', autoHideDuration: 2000 });
            });
        }
    };

    const handleDelete = (id: string) => {
        setOrderToDelete(id);
        setOpenDialog(true);
    };

    const onDeleteConfirm = () => {
        if (orderToDelete) {
            deleteOrder(orderToDelete)
                .then(() => {
                    enqueueSnackbar('Deleted successfully', { variant: 'success', autoHideDuration: 2000 });
                    setRows(rows.filter((row) => row.orderId !== orderToDelete));
                    setOpenDialog(false);
                    setOrderToDelete(null);
                })
                .catch((error) => {
                    enqueueSnackbar('Delete failed', { variant: 'error', autoHideDuration: 2000 });
                    console.error('Error:', error);
                });
        }
    };

    React.useEffect(() => {
        getAllOrders().then((response: any) => {
            setOriginalData(response.data);
            const rowData = response.data.map((item: any) => ({
                ...item,
                themeModel: item.themeModel.themeName,
                giftModel: item.giftModel.giftName
            }))
            setRows(rowData);
        });
    }, []);


    const columns: GridColDef[] = [
        { field: 'orderId', headerName: 'Order ID', width: 150, align: 'left' },
        { field: 'orderName', headerName: 'Name', width: 200, align: 'left' },
        { field: 'orderDescription', headerName: 'Description', width: 300, align: 'left' },
        { field: 'themeModel', headerName: 'Theme', width: 200, align: 'left' },
        { field: 'giftModel', headerName: 'Gift', width: 200, align: 'left' },
        { field: 'orderDate', headerName: 'Order Date', width: 200, align: 'left' },
        { field: 'orderPrice', headerName: 'Price', width: 100, align: 'left' },
        { field: 'orderAddress', headerName: 'Address', width: 250, align: 'left' },
        { field: 'orderPhone', headerName: 'Phone Number', width: 150, align: 'left' },
        { field: 'orderEmail', headerName: 'Email', width: 200, align: 'left' },
        { field: 'orderUpdatedBy', headerName: 'Updated By', width: 200, align: 'left' },
        { field: 'updatedAt', headerName: 'Last Updated', width: 200, align: 'left' },
        {
            field: 'orderstatus',
            headerName: 'Status',
            width: 200,
            align: 'left',
            renderCell: (params) => (
                <FormControl sx={{ m: 1, minWidth: 120, minHeight: 8 }}>
                    <Select
                        value={params.row.orderStatus}
                        onChange={(event) => handleChange(event, params.row.orderId)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ height: '35px', padding: '0px' }}
                    >
                        <MenuItem value={"confirmed"}>Confirmed</MenuItem>
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"processing"}>Processing</MenuItem>
                        <MenuItem value={"dispatched"}>Dispatched</MenuItem>
                        <MenuItem value={"delivered"}>Delivered</MenuItem>
                        <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                    </Select>
                </FormControl>
            ),
        },
        {
            field: 'delete',
            headerName: '',
            width: 100,
            align: 'left',
            renderCell: (params) => (
                <Button onClick={() => handleDelete(params.row.orderId)}>
                    <DeleteIcon />
                </Button>
            ),
        }

    ];

    return (
        <>
            <div className={styles.orderDataGrid}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.orderId}
                />
            </div>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this order?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>
                        No
                    </Button>
                    <Button onClick={onDeleteConfirm}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};