import styles from '../../assets/css/profile-data.module.css'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Fade, Slide, Snackbar, TextField } from '@mui/material';
import DataTable from './DataTable';
import { QueryClient, useQuery, useQueryClient } from 'react-query';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfileData({ userId }) {
    console.log(userId)
    const [value, setValue] = React.useState(0);

    const { isLoading, error, data } = useQuery(['singleUser', userId], () =>
        fetch(`http://localhost:5000/single-user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwt')}`
            }
        })
            .then(res => res.json())
    );
    if (isLoading) return 'Loading...';
    console.log(data.data)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const formData = {
        name: data.data?.name,
        email: data.data?.email,
        phone: data.data?.phone,
        location: data.data?.location,
        lookingFor: data.data?.lookingFor,
        accountType: data.data?.accountType,
        accountExpires: data.data?.accountExpires,
        bkash: data.data?.bkash,
        nagad: data.data?.nagad,
    }

    const SingleInput = ({ label, placeholder }) => {
        return (
            <div style={{ width: '95%' }}>
                <p>{label}</p>
                <input type="text" onChange={(e) => {
                    // console.log('changed', e.target.value)
                    handleUpdate(label, e.target.value)

                }} placeholder={placeholder} className={styles.input} />
            </div>
        )
    }

    const handleUpdate = (label, value) => {
        if (label == 'Full name') {
            formData.name = value
        }
        if (label == 'Email') {
            formData.email = value
        }
        if (label == 'Phone') {
            formData.phone = value
        }
        if (label == 'Location') {
            formData.location = value
        }
        if (label == 'Looking for') {
            formData.lookingFor = value
        }
        if (label == 'Account type') {
            formData.accountType = value
        }
        if (label == 'Account expires(if paid)') {
            formData.accountExpires = value
        }
        if (label == 'Bkash | Nagad') {
            formData.bkash = value
        }
    }

    const queryClient = useQueryClient()
    const handleUserUpdate = () => {
        handleClick(SlideTransition)();
        console.log('update')
        console.log(formData)

        fetch(`http://localhost:5000/update-user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                data: formData
            })

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                queryClient.invalidateQueries('singleUser', userId)
            })
    }
    // for snackbar
    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }
    // for snackbar
    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
    });

    const handleClick = (Transition) => () => {
        setState({
            open: true,
            Transition,
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };
    return (
        <Box sx={{ width: '90%' }} className={styles.parentData}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ width: '300px', color: "#000" }} label="Account Settings" {...a11yProps(0)} />
                    <Tab sx={{ width: '300px', color: "#000" }} label="Account status" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <p style={{ fontWeight: '600' }}>Personal Information</p>
                <Box sx={{ display: { sm: 'block', md: "flex" }, width: '100%', justifyContent: 'space-between', my: 2 }}>
                    <SingleInput label="Full name" placeholder={data?.data?.name} />
                    <SingleInput label="Email" placeholder={data?.data?.email} />
                </Box>
                <Box sx={{ display: { sm: 'block', md: "flex" }, width: '100%', justifyContent: 'space-between', my: 2 }}>
                    <SingleInput label="Phone" placeholder={data?.data?.phone ? data?.data?.phone : 'Number not added'} />
                    <SingleInput label="Location" placeholder={data?.data?.location ? data?.data?.location : 'No location provided'} />
                </Box>
                {/* additional information */}
                <p style={{ fontWeight: '600' }}>Additional Information</p>
                <Box sx={{ display: { sm: 'block', md: "flex" }, width: '100%', justifyContent: 'space-between', my: 2 }}>
                    <SingleInput label="Looking for" placeholder="Bechelor | Family | Sublet | Hostel" />
                    <SingleInput label="Account type" placeholder="Free | Lite | Premium " />
                </Box>
                <Box sx={{ display: { sm: 'block', md: "flex" }, width: '100%', justifyContent: 'space-between', my: 2 }}>
                    <SingleInput label="Account expires(if paid)" placeholder="09-10-2024" />
                    <SingleInput label="Bkash" placeholder={data?.data?.phone ? data?.data?.phone : 'Number not added'} />
                </Box>
                {/* <hr /> */}
                <Button
                    variant="contained"
                    style={{ background: '#0D55DF', color: '#fff', marginTop: '20px' }}
                    onClick={handleUserUpdate}
                >
                    Update
                </Button>
                <Snackbar
                    open={state.open}
                    onClose={handleClose}
                    TransitionComponent={state.Transition}
                    message="Updated new information"
                    key={state.Transition.name}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <p style={{ fontWeight: '600' }}>Account Stats preview</p>
                <DataTable userId={userId} />
            </CustomTabPanel>
        </Box>
    );
}