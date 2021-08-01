import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import axios from '../../../../axios'
import { format } from 'date-fns'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

// import { SimpleCard } from 'app/components'
import {
    Grid,
    Card,
    Divider,
    TextField,
    MenuItem,
    Button,
    Icon,
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import InvoiceItemTable from './InvoiceItemTable'
import { calculateAmount } from './InvoiceFormService'
import CreateCustomerDialog from './CreateCustomerDialog'
import Loading from 'app/components/MatxLoading/MatxLoading'

const apiCall = async () => {
    const result = await axios.get(`//localhost:5000/customer/all`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const { /* status,  */ data } = result

    console.log(data)

    return data
}

const InvoiceForm = () => {
    const [customerList, setCustomerList] = useState([])
    const [open, setOpen] = useState(false)

    const [loading, setLoading] = useState(false)
    const [isAlive, setIsAlive] = useState(true)
    const [openSnack, setOpenSnack] = useState(false)
    const [snackMessage, setSnackMessage] = useState()
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSnack(false)
    }

    function handleClickOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }

    useEffect(() => {
        apiCall().then((value) => {
            if (isAlive) {
                setCustomerList(value)
            }
        })

        return () => setIsAlive(false)
    }, [isAlive])

    const calculateSubTotal = (itemList = [], values) => {
        let subTotal = 0

        itemList.forEach((item) => {
            subTotal += calculateAmount(item)
            item.quantity = item.quantity || 1
            item.discount = item.discount || 0
        })

        values.subTotal = subTotal

        return subTotal
    }

    const calculateTotal = (values) => {
        let total = 0
        total += calculateSubTotal(values.items, values)
        total += values.shippingCharge || 0
        total -= values.advancePayment || 0

        // setTotal(total)
        values.total = total

        return total
    }

    const handleSubmit = async (values, { isSubmitting }) => {
        console.log(values)
        console.log(format(values.invoiceDate, 'MMMM/dd/yyyy kk:mm:ss'))
        setLoading(true)

        const result = await axios.post(
            `//localhost:5000/invoice/add`,
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
            setSnackMessage('Job sheet created ' + data._id)
        } else {
            setSnackMessage('Failed to create job sheet')
        }
        setOpenSnack(true)
    }

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
            <div className="m-sm-30">
                <Card elevation={3}>
                    <div className="flex p-4">
                        <h4 className="m-0">New Job Sheet</h4>
                    </div>
                    <Divider className="mb-2" />

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setSubmitting,
                            setFieldValue,
                        }) => (
                            <form className="p-4" onSubmit={handleSubmit}>
                                <Grid
                                    container
                                    spacing={3}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item md={2} sm={4} xs={12}>
                                        Customer Name#
                                    </Grid>
                                    <Grid item md={10} sm={8} xs={12}>
                                        <div
                                            className="flex flex-wrap m--2"
                                            spacing={10}
                                        >
                                            <TextField
                                                className="min-w-188"
                                                label="Name"
                                                name="customer"
                                                size="small"
                                                variant="outlined"
                                                select
                                                value={values.customer || ''}
                                                onChange={handleChange}
                                            >
                                                {customerList.map(
                                                    (item, ind) => (
                                                        <MenuItem
                                                            value={item}
                                                            key={item.id}
                                                        >
                                                            <div>
                                                                <div>
                                                                    {item.name}
                                                                </div>
                                                                <div>
                                                                    {
                                                                        item.number
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <Divider />
                                                                </div>
                                                            </div>
                                                        </MenuItem>
                                                    )
                                                )}
                                            </TextField>
                                            <span
                                                style={{ paddingLeft: '20px' }}
                                            >
                                                <CreateCustomerDialog />{' '}
                                            </span>
                                        </div>
                                    </Grid>

                                    <Grid item md={2} sm={4} xs={12}>
                                        Invoice#
                                    </Grid>
                                    <Grid
                                        item
                                        md={10}
                                        sm={8}
                                        xs={12}
                                        justify="center"
                                    >
                                        INV-
                                        <TextField
                                            label="Invoice No"
                                            name="invoiceNo"
                                            size="small"
                                            variant="outlined"
                                            defaultValue="000001"
                                            value={values.invoiceNo}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    {/*  <Grid item md={2} sm={4} xs={12}>
                                    Order Number
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Invoice No"
                                        name="orderNo"
                                        size="small"
                                        variant="outlined"
                                        value={values.orderNo}
                                        onChange={handleChange}
                                    />
                                </Grid> */}

                                    <Grid item md={2} sm={4} xs={12}>
                                        Invoice Date
                                    </Grid>
                                    <Grid item md={10} sm={8} xs={12}>
                                        <div className="flex flex-wrap m--2">
                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <KeyboardDatePicker
                                                    className="m-2"
                                                    margin="none"
                                                    name="invoiceDate"
                                                    label="Invoice Date"
                                                    inputVariant="outlined"
                                                    type="text"
                                                    size="small"
                                                    autoOk={true}
                                                    value={values.invoiceDate}
                                                    format="MMMM dd, yyyy"
                                                    onChange={(date) => {
                                                        setFieldValue(
                                                            'invoiceDate',
                                                            date
                                                        )
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>

                                            {/* <TextField
                                            className="m-2 min-w-188"
                                            label="Terms"
                                            name="terms"
                                            size="small"
                                            variant="outlined"
                                            value={values.terms || ''}
                                            onChange={handleChange}
                                            select
                                        >
                                            {paymentTermList.map(
                                                (item, ind) => (
                                                    <MenuItem
                                                        value={item}
                                                        key={item}
                                                    >
                                                        {item}
                                                    </MenuItem>
                                                )
                                            )}
                                        </TextField> */}

                                            {/* <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <KeyboardDatePicker
                                                className="m-2"
                                                margin="none"
                                                name="dueDate"
                                                label="Due Date"
                                                inputVariant="outlined"
                                                type="text"
                                                size="small"
                                                autoOk={true}
                                                value={values.dueDate}
                                                format="MMMM dd, yyyy"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'dueDate',
                                                        date
                                                    )
                                                }
                                            />
                                        </MuiPickersUtilsProvider> */}
                                        </div>
                                    </Grid>

                                    {/* <Grid item xs={12}>
                                    <Divider />
                                </Grid> */}

                                    {/* <Grid item md={2} sm={4} xs={12}>
                                    Salesperson Name
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="min-w-188"
                                        label="Salesperson Name"
                                        name="salesPersonName"
                                        size="small"
                                        variant="outlined"
                                        value={values.salesPersonName || ''}
                                        onChange={handleChange}
                                        select
                                    >
                                        {customerList.map((item, ind) => (
                                            <MenuItem value={item} key={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> */}

                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                </Grid>

                                <div className="mb-8">
                                    <InvoiceItemTable
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        handleChange={handleChange}
                                    />
                                </div>

                                <div className="mb-8">
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Custom Notes"
                                                name="notes"
                                                size="small"
                                                variant="outlined"
                                                multiline
                                                rows={6}
                                                fullWidth
                                                value={values.notes}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Card
                                                className="bg-default p-4"
                                                elevation={0}
                                            >
                                                <Grid
                                                    container
                                                    spacing={3}
                                                    justify="space-between"
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={6}>
                                                        Sub Total
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className="text-right">
                                                            {calculateSubTotal(
                                                                values.items,
                                                                values
                                                            ).toFixed(2)}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className="flex items-center">
                                                            <span className="whitespace-pre">
                                                                Shipping Charges
                                                            </span>
                                                            <TextField
                                                                className="ml-3"
                                                                name="shippingCharge"
                                                                size="small"
                                                                type="number"
                                                                variant="outlined"
                                                                value={
                                                                    values.shippingCharge ||
                                                                    ''
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className="text-right">
                                                            {(
                                                                values.shippingCharge ||
                                                                0
                                                            ).toFixed(2)}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className="flex items-center">
                                                            <span className="whitespace-pre">
                                                                Advance Payemnt
                                                            </span>
                                                            {/* <TextField
                                                            name="otherField"
                                                            size="small"
                                                            variant="outlined"
                                                            value={
                                                                values.advancePayment ||
                                                                ''
                                                            }
                                                            // onChange={
                                                            //     handleChange
                                                            // }
                                                        /> */}

                                                            <TextField
                                                                className="ml-3"
                                                                name="advancePayment"
                                                                size="small"
                                                                variant="outlined"
                                                                type="number"
                                                                value={
                                                                    values.advancePayment ||
                                                                    ''
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className="text-right">
                                                            {(
                                                                values[
                                                                    values
                                                                        .otherField
                                                                ] || 0
                                                            ).toFixed(2)}
                                                        </div>
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <h5 className="m-0">
                                                            Total ( AED )
                                                        </h5>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className="text-right">
                                                            <h5 className="m-0">
                                                                {calculateTotal(
                                                                    values
                                                                ).toFixed(2)}
                                                            </h5>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </div>

                                <Card className="bg-default p-4" elevation={0}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Terms & Conditions"
                                                name="terms_conditions"
                                                size="small"
                                                variant="outlined"
                                                multiline
                                                rows={6}
                                                fullWidth
                                                value={values.terms_conditions}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <label htmlFor="upload-multiple-file">
                                                <Button
                                                    className="capitalize"
                                                    color="primary"
                                                    component="span"
                                                    variant="contained"
                                                >
                                                    <div className="flex items-center">
                                                        <Icon className="pr-8">
                                                            cloud_upload
                                                        </Icon>
                                                        <span>Upload File</span>
                                                    </div>
                                                </Button>
                                            </label>
                                            <input
                                                className="hidden"
                                                onChange={(e) =>
                                                    setFieldValue(
                                                        'files',
                                                        e.target.files
                                                    )
                                                }
                                                id="upload-multiple-file"
                                                type="file"
                                                multiple
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>

                                <div className="mt-6">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </Card>
            </div>
        </>
    )
}

// const paymentTermList = [
//     'NET 15',
//     'NET 30',
//     'NET 45',
//     'NET 60',
//     'Due end of the month',
//     'Due on receive',
// ]

// var customerList = [
//     { number: '0521104369', name: 'kushal Mahapatro' },
//     { number: '0521104360', name: 'Umesh Kumar Mahato' },
//     { number: '0521104362', name: 'Piyush Kunar Shawarya' },
//     { number: '0521104363', name: 'Nishant Gupta' },
// ]

const initialValues = {
    customer: '',
    advancePayment: '0',
    invoice: '000001',
    invoiceDate: new Date(),
    // dueDate: new Date(),
}

export default InvoiceForm
