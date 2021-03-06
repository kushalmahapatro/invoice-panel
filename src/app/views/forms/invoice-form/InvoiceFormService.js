import axios from 'axios'

export const calculateAmount = (item) => {
    if (!item.discount) return (item.price || 0 ) * (item.quantity || 1) 

    if (item.discountType === 'AED') {
        let total = item.price * item.quantity
        return total - item.discount || 0
    } else {
        let total = item.price * item.quantity
        return total - (total * item.discount) / 100 || 0
    }
}

export const getProductList = () => {
    return axios.get('/api/ecommerce/get-product-list')
}
