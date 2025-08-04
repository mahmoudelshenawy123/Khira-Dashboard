import { useTranslation } from 'react-i18next'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { ItemsList } from './components/ItemsList'
import OrderDetails from './components/OrderDetails'
// import {BrandsListWrapper} from './users-list/BrandsList'


const ItemsPage = () => {
  const {t} =useTranslation()
  const brandsBreadcrumbs: Array<PageLink> = [
    {
      title: t('Orders'),
      path: '/apps/orders/all',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/all'
          element={
            <>
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t('Orders')}</PageTitle>
              <ItemsList />
            </>
          }
        />
        <Route
          path='/order-details/:id'
          element={
            <>
              {/* <PageTitle breadcrumbs={brandsBreadcrumbs}>{t('Orders')}</PageTitle> */}
              <OrderDetails />
            </>
          }
        />
        
      </Route>
      <Route index element={<Navigate to='/apps/orders/all' />} />
    </Routes>
  )
}

export default ItemsPage
