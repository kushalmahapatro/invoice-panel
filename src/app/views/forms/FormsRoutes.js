import React from 'react'

const formsRoutes = [
    {
        path: '/forms/basic',
        component: React.lazy(() => import('./BasicForm')),
    },
    {
        path: '/forms/editor',
        component: React.lazy(() => import('./EditorForm')),
    },
    {
        path: '/forms/upload',
        component: React.lazy(() => import('./UploadForm')),
    },
    {
        path: '/invoice',
        component: React.lazy(() => import('./invoice-form/InvoiceForm')),
    },
    {
        path: '/jobsheet',
        component: React.lazy(() => import('./invoice-form/JobSheetForm')),
    }

]

export default formsRoutes
