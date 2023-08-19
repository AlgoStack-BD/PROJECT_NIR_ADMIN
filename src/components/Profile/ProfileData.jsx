import styles from '../../assets/css/profile-data.module.css'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import DataTable from './DataTable';

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

export default function ProfileData({userId}) {
    console.log(userId)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const SingleInput = ({ label, placeholder }) => {
        return (
            <div style={{ width: '95%' }}>
                <p>{label}</p>
                <input type="text" placeholder={placeholder} className={styles.input} />
            </div>
        )
    }

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
                <Box sx={{ display: "flex", width: '100%', justifyContent: 'space-between', my: 2 }}>
                    <SingleInput label="Full name" placeholder="Mahinur Rahman" />
                    <SingleInput label="Email" placeholder="mahi121.mr@gmail.com" />
                </Box>
                <Box sx={{ display: "flex", width: '100%', justifyContent: 'space-between', my: 2 }}>
                    <SingleInput label="Phone" placeholder="01778287079" />
                    <SingleInput label="Location" placeholder="Shahi eidgah, Sylhet" />
                </Box>
                {/* additional information */}
                <p style={{ fontWeight: '600' }}>Additional Information</p>
                <Box sx={{ display: "flex", width: '100%', justifyContent: 'space-between', my: 2 }}>
                    <SingleInput label="City" placeholder="Sylhet" />
                    <SingleInput label="State" placeholder="Sylhet" />
                </Box>
                <Box sx={{ display: "flex", width: '100%', justifyContent: 'space-between', my: 2 }}>
                    <SingleInput label="Post Code" placeholder="3100" />
                    <SingleInput label="Country" placeholder="Bangladesh" />
                </Box>
                {/* <hr /> */}
                <Button variant="contained" style={{ background: '#0D55DF', color: '#fff', marginTop: '20px' }}>Update</Button>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <p style={{ fontWeight: '600' }}>Account Stats preview</p>
                <DataTable />
            </CustomTabPanel>
        </Box>
    );
}