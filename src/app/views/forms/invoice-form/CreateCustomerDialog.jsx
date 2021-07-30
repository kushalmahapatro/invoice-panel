import React, { useState } from 'react'
import { Formik } from 'formik'

// import { makeStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
// import FormControl from '@material-ui/core/FormControl'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import InputLabel from '@material-ui/core/InputLabel'
// import MenuItem from '@material-ui/core/MenuItem'
// import Select from '@material-ui/core/Select'
// import Switch from '@material-ui/core/Switch'
import {
    Grid,
    /* Card , Divider , Icon, */ TextField,
    Button,
} from '@material-ui/core'

// const useStyles = makeStyles((theme) => ({
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//         margin: 'auto',
//         width: 'fit-content',
//     },
//     formControl: {
//         marginTop: theme.spacing(2),
//         minWidth: 120,
//     },
//     formControlLabel: {
//         marginTop: theme.spacing(1),
//     },
// }))

export default function CreateCustomerDialog() {
    // const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [fullWidth /* setFullWidth */] = React.useState(true)
    const [maxWidth /* setMaxWidth */] = React.useState('sm')

    const [state, setState] = useState({
        date: new Date(),
    })

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    // function handleMaxWidthChange(event) {
    //     setMaxWidth(event.target.value)
    // }

    // function handleFullWidthChange(event) {
    //     setFullWidth(event.target.checked)
    // }

    const handleSubmit = /* async (values, { isSubmitting }) */ (values) => {
        console.log(values)
        console.log('submitted')
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <React.Fragment>
            <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
            >
                Create customer
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">
                    <Grid container spacing={3} alignItems="center">
                        <Grid item md={11} sm={8} xs={12}>
                            Create customer
                        </Grid>
                        {/* Create customer */}
                        <Grid item md={1} sm={4} xs={12}>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please add the below asked details to add a new
                        customer.
                    </DialogContentText>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setSubmitting,
                            setFieldValue,
                        }) => (
                            <form
                                className="p-3"
                                onSubmit={handleSubmit}
                                onError={() => null}
                            >
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item md={3} sm={4} xs={12}>
                                        Customer Name#
                                    </Grid>
                                    <Grid item md={9} sm={8} xs={12}>
                                        <TextField
                                            style={{ width: '100%' }}
                                            label="Name"
                                            name="name"
                                            size="small"
                                            variant="outlined"
                                            defaultValue=""
                                            value={values.name}
                                            onChange={handleChange}
                                            validators={['required']}
                                            errorMessages={[
                                                'Customer name is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} alignItems="center">
                                    <Grid item md={3} sm={4} xs={12}>
                                        Mobile No#
                                    </Grid>
                                    <Grid item md={9} sm={8} xs={12}>
                                        <TextField
                                            style={{ width: '100%' }}
                                            label="Number"
                                            name="number"
                                            size="small"
                                            type="number"
                                            variant="outlined"
                                            defaultValue=""
                                            value={values.number}
                                            onChange={handleChange}
                                            validators={[
                                                'required',
                                                'minStringLength: 9',
                                                'maxStringLength: 10',
                                            ]}
                                            errorMessages={[
                                                'Customer phone number is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} alignItems="center">
                                    <Grid item md={3} sm={4} xs={12}>
                                        Address#
                                    </Grid>
                                    <Grid item md={9} sm={8} xs={12}>
                                        <TextField
                                            style={{ width: '100%' }}
                                            label="Address"
                                            name="address"
                                            size="small"
                                            variant="outlined"
                                            defaultValue=""
                                            value={values.address}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                    {/* <form className={classes.form} noValidate>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="max-width">
                                maxWidth
                            </InputLabel>
                            <Select
                                value={maxWidth}
                                onChange={handleMaxWidthChange}
                                inputProps={{
                                    name: 'max-width',
                                    id: 'max-width',
                                }}
                            >
                                <MenuItem value={false}>false</MenuItem>
                                <MenuItem value="xs">xs</MenuItem>
                                <MenuItem value="sm">sm</MenuItem>
                                <MenuItem value="md">md</MenuItem>
                                <MenuItem value="lg">lg</MenuItem>
                                <MenuItem value="xl">xl</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            className={classes.formControlLabel}
                            control={
                                <Switch
                                    checked={fullWidth}
                                    onChange={handleFullWidthChange}
                                    value="fullWidth"
                                />
                            }
                            label="Full width"
                        />
                    </form> */}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
const initialValues = {
    customerType: '',
    otherField: 'Adjustment',
}
