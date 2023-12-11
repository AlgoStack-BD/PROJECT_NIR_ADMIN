import React, { useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { Box, Button, IconButton, Menu, MenuItem, TextField, Switch, FormControlLabel, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import styles from '../../assets/css/users.module.css'
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Users = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState(null);
  const handleClickOpen = (action, user) => {
    console.log(action);
    console.log(user)
    setSelectedUser(user);
    setSelectedAction(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const UpdateUserForm = ({ handleClose }) => {
    const selectedUserId = selectedUser ? selectedUser : selectedRows[selectedRows.length - 1].id;

    const [formData, setFormData] = useState({
      name: selectedRows[0].user,
      phone: selectedRows[0].phone,
      isVerified: selectedRows[0].isVerified,
      image: selectedRows[0].image,
      location: selectedRows[0].location,
      totalPost: selectedRows[0].totalPost,
      rentSuccess: selectedRows[0].rentSuccess,
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleToggleChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        isVerified: e.target.checked,
      }));
    };

    const handleSubmit = async () => {
      JSON.stringify(formData)
      const res = await axios.put(`http://localhost:5000/update-user/${selectedUserId}`, {
        "data": formData
      }, {
        headers: {
          'Authorization': `${localStorage.getItem('jwt')}`
        }
      })
      console.log(res.data)
      handleClose();
    };

    return (
      <Box>
        <h2>UPDATE USER DETAILS</h2>
        <form>
          <TextField
            label="Name"
            name="name"
            placeholder='Enter name'
            value={formData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Phone"
            name="phone"
            placeholder='Enter number'
            type='number'
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Location"
            name="location"
            placeholder='Enter your location'
            value={formData.location}
            onChange={handleChange}
            fullWidth
            // value can not be less than 0
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.isVerified}
                onChange={handleToggleChange}
                name="isVerified"
                color="primary"
              />
            }
            label="Is Verified"
            sx={{ mt: 2 }}
          />
          {/* dropdown for total post */}
          <TextField
            label="Total Post"
            name="totalPost"
            placeholder='Enter total post'
            type='number'
            value={formData.totalPost}
            onChange={handleChange}
            fullWidth
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ mt: 2 }}
          />
          {/* dropdown for rent success */}
          <TextField
            label="Rent Success"
            name="rentSuccess"
            placeholder='Enter rent success'
            type='number'
            value={formData.rentSuccess}
            onChange={handleChange}
            fullWidth
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ mt: 2 }}
          />
          {/* Add other fields as needed */}
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Confirm update
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ ml: 2 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    );
  };
  const columns = [
    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   sortable: false,
    //   renderCell: (params) => (
    //     <Tooltip title={params.row.id} >
    //       <span className="table-cell-trucate">{params.row.id}</span>
    //     </Tooltip>
    //   ),
    // },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.row.user} style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{ height: 35, width: 35, borderRadius: '50%', marginRight: 10 }}
            src={`http://localhost:5000/uploads/` + params.row.image}  // Access params.row.image instead of params.value.image
          // alt="user-image"
          />
          <div>
            {params.row.user}  {/* Access params.row.user instead of params.value */}
          </div>
        </Tooltip>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.row.email} >
          {params.row.email}
        </Tooltip>
      )
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.row.phone} >
          {params.value ? params.value : 'Not Provided'}
        </Tooltip>
      )
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 250,
      renderCell: (params) => (
        <Tooltip title={params.row.location}>
          {params.value ? params.value : 'Not Provided'}
        </Tooltip>
      )
    },
    {
      field: 'isVerified',
      headerName: 'Status',
      width: 150,
      // if true then verified else not verified
      renderCell: (params) => (
        <div title={params.row.isVerified} >
          {params.value == true ?
            <span style={{
              background: 'green',
              padding: '7px 27px',
              borderRadius: '30px',
              color: 'white',
            }}>
              Verified
            </span> :
            <span style={{
              background: 'red',
              padding: '7px 15px',
              borderRadius: '30px',
              color: 'white',
            }}>
              Not Verified
            </span>
          }
        </div>
      )
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      // width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    // {
    //   field: 'isAdmin',
    //   headerName: 'Admin',
    //   width: 100,
    //   // if true then show admin else not admin
    //   renderCell: (params) => (
    //     <div>
    //       {params.value == true ?
    //         <span style={{ background: 'green', padding: '7px 15px', borderRadius: '30px', color: 'white' }}>
    //           Admin
    //         </span>
    //         : 'Not Admin'}
    //     </div>
    //   )
    // },
    {
      field: 'totalPost',
      headerName: 'Total Post',
      width: 120,
      renderCell: (params) => (
        <div>
          {params.value ? params.row.totalPost : '0'}
        </div>
      )
    },
    {
      field: 'rentSuccess',
      headerName: 'Rent Success',
      width: 120,
      renderCell: (params) => (
        <div>
          {params.value ? params.row.rentSuccess : '0'}
        </div>
      )
    },
    {
      width: 20,
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
          <div style={{ position: 'relative' }}>
            {
              (!selectedRows || selectedRows?.length == 0 || selectedRows?.length == 1) && <>
                <Button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    color: '#3E6EC9',
                    fontWeight: 'bold',
                    width: '10px',
                    display: params.row.isAdmin == true ? 'none' : 'block',

                  }}

                  // for relativity purpose
                  disabled={selectedRows?.length == 1}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  style={{
                    position: 'absolute',
                    right: '0',
                    marginLeft: '-80px',
                    boxShadow: 'none',
                  }}
                >
                  <MenuItem onClick={() => handleClickOpen("update", `${params.row.id}`)}>
                    Update data
                  </MenuItem>
                  <MenuItem onClick={() => handleClickOpen("ban", `${params.row.id}`)}>
                    Ban user
                  </MenuItem>
                  <MenuItem onClick={() => handleClickOpen("delete", `${params.row.id}`)}>
                    Delete user
                  </MenuItem>
                </Menu>
              </>
            }
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
      // console.log(data)
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
    totalPost: user.totalPost,
    rentSuccess: user.rentSuccess,
    isAdmin: user.isAdmin,
    isBanned: user.isBanned,  // Add this field
  })) : [];

  const [selectedRows, setSelectedRows] = useState(null);
  console.log(selectedRows)

  return (
    <div style={{
      margin: '20px 32px',
      position: 'relative',
    }}>

      {/* search bar */}
      {/* <div style={{
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
      </div> */}
      {/* creater new user */}
      <Button
        variant='contained'
        onClick={() => alert('Call create user API here')}
        sx={{ background: '#0D55DF', color: '#fff', cursor: 'pointer' }}
        style={{
          position: 'absolute',
          right: '10px',
          top: '0',
          zIndex: 1,
        }}>
        Create New User
      </Button>
      {
        selectedRows && selectedRows.length > 1 && <Box style={{
          Transition: 'all 0.3s ease-in-out',
        }}>
          <Button
            variant='contained'
            onClick={() => alert('Call delete user API here')}
            color='error'
            sx={{ cursor: 'pointer' }}
            style={{
              position: 'absolute',
              right: '180px',
              top: '0',
              zIndex: 1,
            }}>
            Delete Selected Users
          </Button>
          <Button
            variant='contained'
            onClick={() => alert('Call ban user API here')}
            color='error'
            sx={{ cursor: 'pointer' }}
            style={{
              position: 'absolute',
              right: '400px',
              top: '0',
              zIndex: 1,
            }}>
            Ban Selected Users
          </Button>
        </Box>
      }
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
            slotProps={{
              toolbar: {
                exportbutton: {
                  csvOptions: {
                    fields: ['user', 'email', 'phone', 'location', 'isVerified', 'totoalPost', 'rentSuccess'],
                  },
                  // export all data
                  exportAllData: true,
                },
              },
            }}
            checkboxSelection
            isRowSelectable={(params) => params.row.isAdmin !== true}
            // get selected rows
            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRowData = mappedRows.filter((row) =>
                selectedIDs.has(row.id.toString())
              )
              setSelectedRows(selectedRowData);
            }}
          // show tooltip on hover
          />

        }

        <Dialog
          maxWidth="md"
          fullWidth
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <Box
            style={{
              height: "100%",
              padding: "10px",
            }}
          >
            <IconButton
              style={{ position: "absolute", right: "5px", top: "5px" }}
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ ml: 1 }}>
              {selectedAction === "ban" && (
                <Box>
                  <h2>Are you sure you want to BAN this user?</h2>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => alert("Call disbale api here")}
                    >
                      Confim BAN
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ ml: 2 }}
                      onClick={handleClose}
                    >
                      Do not BAN
                    </Button>
                  </Box>
                </Box>
              )}
              {selectedAction === "update" && <UpdateUserForm handleClose={handleClose} />}
              {/* delete */}
              {selectedAction === "delete" && (
                <Box>
                  <h2>Confirm <span style={{ color: "red" }}>DELETE</span> user permanently!</h2>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => alert("Call disbale api here")}
                    >
                      Confirm DELETE
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ ml: 2 }}
                      onClick={handleClose}
                    >
                      cancel
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Dialog>
      </div>
    </div>
  )
}

export default Users