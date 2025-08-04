import { useTranslation } from 'react-i18next'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import AddUpdateCarForm from './components/AddUpdateCarForm'
import { CarsList } from './components/CarsList'
// import {BrandsListWrapper} from './users-list/BrandsList'


const CarsPage = () => {
  const {t} =useTranslation()
  const brandsBreadcrumbs: Array<PageLink> = [
    {
      title: t('Products'),
      path: '/apps/products/all',
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
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t("Product")}</PageTitle>
              <CarsList />
            </>
          }
        />
        <Route
          path='/add-product'
          element={
            <>
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t("Product")}</PageTitle>
              <AddUpdateCarForm />
            </>
          }
        />
        <Route
          path='/update-product/:id'
          element={
            <>
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t("Product")}</PageTitle>
              <AddUpdateCarForm />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/products/all' />} />
    </Routes>
  )
}

export default CarsPage
