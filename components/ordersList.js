import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography, Button, Box } from '@mui/material';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 130 },
    { id: '' }
];


export default function OrderList({ data, handleDelete, handleUpdate }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    console.log(data);


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0 ?
                                (data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell sx={{ alignItems: 'center' }}>
                                                    <Typography variant="p">{row.name}</Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography variant='p'>{row.description}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleUpdate(row.id)}>Update</Button>
                                                    <Button variant="outlined" onClick={() => handleDelete(row.id)}>Delete</Button>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })
                                ) : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            
        </Paper>
    );
}
