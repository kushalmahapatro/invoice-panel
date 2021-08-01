import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import axios from '../../../../axios'

// import { makeStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'


// import FormControl from '@material-ui/core/FormControl'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import InputLabel from '@material-ui/core/InputLabel'
// import MenuItem from '@material-ui/core/MenuItem'
// import Select from '@material-ui/core/Select'
// import Switch from '@material-ui/core/Switch'
import * as Yup from 'yup'
import {
    Grid,
    /* Card , Divider , Icon, */ TextField,
    Button,
} from '@material-ui/core'
import Loading from 'app/components/MatxLoading/MatxLoading'

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
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fullWidth /* setFullWidth */] = useState(true)
    const [maxWidth /* setMaxWidth */] = useState('sm')

    // snackbar thingies
    const [openSnack, setOpenSnack] = useState(false)
    const [snackMessage, setSnackMessage] = useState()
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSnack(false)
    }

    // snackbar thingies end

    const validateSchema = Yup.object().shape({
        name: Yup.string().required(`Please enter name!`),
        number: Yup.string().required(`Please enter number!`),
    })

    const initialValues = {
        name: '',
        number: '',
        address: '',
    }

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

    const handleSubmit = async (values) => {
        handleClose()
        setLoading(true)
        console.log('values', values)

        const result = await axios.post(
            `//localhost:5000/customer/add`,
            values,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        setLoading(false)
        const { status, data } = result
        if (data._id) {
            console.log('success')
            setSnackMessage('New Customer Added')
        } else {
            setSnackMessage('Failed to add new customer')
        }
        setOpenSnack(true)
        console.log('result', status, data)
    }

    // const handleChange = (event) => {
    //     event.persist()
    //     setState({
    //         ...state,
    //         [event.target.name]: event.target.value,
    //     })
    // }

    return (
        <>
            {loading && <Loading />}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
                message={snackMessage}
                action={
                    <>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            />
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
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                    validationSchema={validateSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                        setSubmitting,
                        setFieldValue,
                    }) => (
                        <Form className="p-3" onError={() => null}>
                            <DialogTitle id="max-width-dialog-title">
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item md={11} sm={8} xs={12}>
                                        Create customer
                                    </Grid>
                                    {/* Create customer */}
                                    <Grid item md={1} sm={4} xs={12}>
                                        <DialogActions>
                                            <Button
                                                onClick={handleClose}
                                                color="primary"
                                            >
                                                Close
                                            </Button>
                                        </DialogActions>
                                    </Grid>
                                </Grid>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please add the below asked details to add a
                                    new customer.
                                </DialogContentText>

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
                                            // defaultValue=""
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // validators={['required']}
                                            // errorMessages={[
                                            //     'Customer name is required',
                                            // ]}
                                        />
                                        {errors.name && touched.name && (
                                            <div className="">
                                                {errors.name}
                                            </div>
                                        )}
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
                                            // defaultValue=""
                                            value={values.number}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // validators={[
                                            //     'required',
                                            //     'minStringLength: 9',
                                            //     'maxStringLength: 10',
                                            // ]}
                                            // errorMessages={[
                                            //     'Customer phone number is required',
                                            // ]}
                                        />
                                        {errors.number && touched.number && (
                                            <div className="">
                                                {errors.number}
                                            </div>
                                        )}
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
                                            // defaultValue=""
                                            value={values.address}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

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
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}
