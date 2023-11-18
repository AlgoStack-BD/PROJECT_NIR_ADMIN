import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';


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
      width: 150,
      type: 'number',
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = React.useState(null);
    
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
    
        const handleClose = () => {
          setAnchorEl(null);
        };
    
        return (
          <div>
            <Button
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                color: '#3E6EC9',
                fontWeight: 'bold',
                width: '10px',
              }}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{
                marginLeft:'-70px',
                boxShadow: 'none',
              }}
            >
              <MenuItem onClick={() => alert('Edit user')}>
                Edit User
              </MenuItem>
              <MenuItem onClick={() => alert('Ban user')}>Ban User</MenuItem>
              <MenuItem onClick={() => alert('Update user')}>
                Update User
              </MenuItem>
              <MenuItem onClick={() => alert('Create user')}>
                Create User
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
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
      return [];
      // throw new Error('Could not fetch users')
    }
  }
  const { isLoading, error, data: users } = useQuery('allUsers', fetchUsers);

  // Check if users is an array before calling map
  const mappedRows = Array.isArray(users) ? users.map((user) => ({
    id: user._id,
    user: user.name,
    phone: user.phone,
    email: user.email,
    location: user.location,
    image: user.image,
    isVerified: user.isVerified,
    totalPost: user.totalPost, // Fix typo in totalPost
    rentSuccess: user.rentSuccess,
  })) : [];

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
          width: '100%',
          height: 40,
          background: '#FFFFFF',
          borderRadius: 5,
          padding: '0 10px',
          border: '1px solid #E5E5E5',
        }}>
          {/* search icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <g clipPath="url(#clip0_60_3980)">
              <path d="M7.26562 12.5C10.1651 12.5 12.5156 10.1495 12.5156 7.25C12.5156 4.35051 10.1651 2 7.26562 2C4.36613 2 2.01562 4.35051 2.01562 7.25C2.01562 10.1495 4.36613 12.5 7.26562 12.5Z" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10.9766 10.9625L14.0141 14.0001" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_60_3980">
                <rect width="16" height="16" fill="white" transform="translate(0.015625)" />
              </clipPath>
            </defs>
          </svg>
          {/* search input box */}
          <input
            onChange={(e) => {
              console.log(e.target.value)
            }}
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
      {/* <select style={{
        width: '20%',
        height: 40,
        background: '#FFFFFF',
        borderRadius: 5,
        padding: '0 10px',
        border: '1px solid #E5E5E5',
        outline: 'none',
        marginBlock: 10,
        appearance: 'none',
      }}>
        <option value="all">All Users</option>
        <option value="unverified">Unverified Users</option>
      </select> */}

      {/* table of users data */}
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
            rows={mappedRows}
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
            // email filter
            slots={{
              toolbar: GridToolbar,
              // not found text
              noRowsOverlay: () => <div>No users found.</div>,
            }}
            // disable density selector and column selector
            disableDensitySelector
            disableColumnSelector
            // add pdf export
            // name of the export button is export pdf
            slotProps={{
              toolbar: {
                exportButton: {
                  csvOptions: {
                    fields: ['user', 'email', 'phone', 'location', 'isVerified', 'totoalPost', 'rentSuccess'],
                  },
                  // export all data
                  exportAllData: true,
                },
              },
            }}
          />
        }

      </div>
    </div>
  )
}

export default Users