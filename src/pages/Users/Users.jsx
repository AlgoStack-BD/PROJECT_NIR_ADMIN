import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { showSuccessToast } from '../../components/Toast/SuccessToast';


const Users = () => {
  const columns = [
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{ height: 35, width: 35, borderRadius: '50%', marginRight: 10 }}
            src={`http://localhost:5000/uploads/` + params.row.image}  // Access params.row.image instead of params.value.image
          // alt="user-image"
          />
          <div>
            {params.row.user}  {/* Access params.row.user instead of params.value */}
          </div>
        </div>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 200,
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 150,
      renderCell: (params) => (
        <div>
          {params.value ? params.value : 'Not Provided'}
        </div>
      )
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 200,
      renderCell: (params) => (
        <div>
          {params.value ? params.value : 'Not Provided'}
        </div>
      )
    },
    {
      field: 'isVerified',
      headerName: 'Status',
      width: 100,
      // if true then verified else not verified
      renderCell: (params) => (
        <div>
          {params.value == true ? 'Verified' : 'Not Verified'}
        </div>
      )
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      // width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'totoalPost',
      headerName: 'Total Post',
      width: 100,
      renderCell: (params) => (
        <div>
          {params.value ? params.value : '0'}
        </div>
      )
    },
    {
      field: 'rentSuccess',
      headerName: 'Rent Success',
      width: 100,
      renderCell: (params) => (
        <div>
          {params.value ? params.value : '0'}
        </div>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      type: 'number',
      renderCell: (params) => (
        <button
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            color: '#3E6EC9',
            fontWeight: 'bold'
          }}
          onClick={() => {
            alert('Are you sure you want to delete this user?')
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <g clip-path="url(#clip0_353_269)">
              <ellipse cx="7.66797" cy="3.8136" rx="1" ry="1" fill="#747474" />
              <ellipse cx="7.66797" cy="9.14697" rx="1" ry="1" fill="#747474" />
              <ellipse cx="7.66797" cy="14.4802" rx="1" ry="1" fill="#747474" />
            </g>
            <defs>
              <clipPath id="clip0_353_269">
                <rect width="16" height="16" fill="white" transform="translate(0 0.813599)" />
              </clipPath>
            </defs>
          </svg>
        </button>
      )
    }
  ];


  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5000/all-users', {
      headers: {
        'Authorization': `${localStorage.getItem('jwt')}`
      }
    })
    const data = await response.json();
    // console.log(data)
    if (data.status == 200) {
      console.log(data)
      return data.data
    } else {
      throw new Error('Could not fetch users')
    }
  }
  const { isLoading, error, data: users } = useQuery('allUsers', fetchUsers);
  // const mappedRows = 
  return (
    <div style={{
      margin: '20px 32px',
    }}>

      {/* search bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '80%',
          height: 40,
          background: '#FFFFFF',
          borderRadius: 5,
          padding: '0 10px',
          border: '1px solid #E5E5E5',
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <g clip-path="url(#clip0_60_3980)">
              <path d="M7.26562 12.5C10.1651 12.5 12.5156 10.1495 12.5156 7.25C12.5156 4.35051 10.1651 2 7.26562 2C4.36613 2 2.01562 4.35051 2.01562 7.25C2.01562 10.1495 4.36613 12.5 7.26562 12.5Z" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10.9766 10.9625L14.0141 14.0001" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_60_3980">
                <rect width="16" height="16" fill="white" transform="translate(0.015625)" />
              </clipPath>
            </defs>
          </svg>
          <input
            style={{
              border: 'none',
              outline: 'none',
              marginLeft: 10,
              width: '100%',
              height: '100%',
              background: 'transparent',
              placeholder: '#CCC',
            }}
            type="text"
            placeholder="Search"
          />
        </div>
        <button
          style={{
            background: '#0D55DF',
            border: 'none',
            outline: 'none',
            borderRadius: 5,
            padding: '0 40px',
            height: 40,
            width: '10%',
            color: '#fff',
            fontSize: 14,
            cursor: 'pointer',
            marginLeft: 10,
          }}
        >
          Search
        </button>
      </div>

      {/* select all user / only varified user */}
      <select style={{
        width: '20%',
        height: 40,
        background: '#FFFFFF',
        borderRadius: 5,
        padding: '0 10px',
        border: '1px solid #E5E5E5',
        outline: 'none',
        marginBlock: 20,
      }}>
        <option value="all">All Users</option>
        <option value="verified">Verified Users</option>
      </select>

      <div style={{ height: 400, width: '100%' }}>
        {
          error && <div>
            <h1>Error took place</h1>
          </div>
        }
        {
          isLoading && <div>
            <h1>Loading...</h1>
          </div>
        }
        {
          users && <DataGrid
            rows={users?.map(user => ({
              id: user._id,
              user: user.name,
              phone: user.phone,
              email: user.email,
              location: user.location,
              image: user.image,
              isVerified: user.isVerified,
              totoalPost: user.totalPost,
              rentSuccess: user.rentSuccess,
            }))}
            style={{
              boxShadow: 'none',
              border: 'none',
            }}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        }

      </div>
    </div>
  )
}

export default Users