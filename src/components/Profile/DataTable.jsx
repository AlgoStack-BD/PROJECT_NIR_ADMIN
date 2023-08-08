import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(date, ownerRenter, status, name, calories, fat, carbs, protein) {
    return { date, ownerRenter, status, name, calories, fat, carbs, protein };
}

const rows = [
    createData('2023-08-09', 'Owner', 'Active', 'Property A', 159, 6.0, 24, 4.0),
    createData('2023-08-10', 'Renter', 'Pending', 'Property B', 237, 9.0, 37, 4.3),
    // Add more rows as needed
];

export default function DataTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Owner/Renter</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.date}
                            </TableCell>
                            <TableCell>{row.ownerRenter}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
