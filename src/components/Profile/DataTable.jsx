import * as React from 'react';
import { useQuery } from 'react-query';
import MenuItem from '@mui/material/MenuItem';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, FormControl, InputLabel, Select } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

export default function DataTable({ userId }) {
    // console.log(userId)
    // var dateFromObjectId = function (objectId) {
    //     var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     var date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    //     var ndate = formatDate(date) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' Its ' + week[date.getDay()] + '. Month\'s Last Date is ' + formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
    //     return ndate;
    // };

    // var formatDate = function (Date) {
    //     var fDate = Date.getDate() + '/' + (Date.getMonth() + 1) + '/' + Date.getFullYear();
    //     return fDate;
    // }
    const [rows, setRows] = useState(5);
    const [page, setPage] = useState(1);

    const handleRowChange = (event) => {
        setRows(event.target.value);
        setPage(1); // Reset page
    };
    const { isLoading, error, data } = useQuery(['postByUserId', userId], () =>
        fetch(`https://nir-house-renting-service-65vv8.ondigitalocean.app/single-post-by-userId/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwt')}`
            }
        })
            .then(res => res.json())
    );
    if (isLoading) return 'Loading...';

    const dateFromObjectId = function (objectId) {
        let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
        let ndate = formatDate(date) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        return ndate;
    };

    const formatDate = function (Date) {
        let fDate = Date.getDate() + '/' + (Date.getMonth() + 1) + '/' + Date.getFullYear();
        return fDate;
    }
    console.log(data.data)
    // let date = dateFromObjectId(data.data[0]._id);
    // console.log(date);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const displayedData = data?.data?.slice((page - 1) * rows, page * rows);
    console.log(displayedData)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Post Status</TableCell>
                        <TableCell>Rent Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ pe: 1 }}>
                    {displayedData?.length === 0 ? <TableRow><TableCell colSpan={5} align="center">NO POST FOUND</TableCell></TableRow> :
                        // if data is not empty then map through data
                        displayedData?.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': { backgroundColor: '#f5f5f5' },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {dateFromObjectId(row._id)}
                                </TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.price} BDT</TableCell>
                                <TableCell>{row.isApproved ? 'Approved' : 'Pending'}</TableCell>
                                <TableCell>{row.isSold ? 'Rented' : 'Not Rented'}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                {
                    displayedData?.length !== 0 &&
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5} align="right" sx={{ position: 'relative' }}>
                                <Select
                                    value={rows}
                                    onChange={handleRowChange}
                                    sx={{ mr: 1, height: '40px', position: 'absolute', right: '40px', bottom: '15px' }}

                                >
                                    <MenuItem value={5} selected >Select row</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                </Select>
                                <Pagination count={Math.ceil(data?.data?.length / rows)} page={page} onChange={handlePageChange} />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                }

            </Table>
        </TableContainer>
    );
}
