import { useTranslation } from 'react-i18next'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import AddUpdateItemForm from './components/AddUpdateItemForm'
import { ItemsList } from './components/ItemsList'
// import {BrandsListWrapper} from './users-list/BrandsList'


const ItemsPage = () => {
  const {t} =useTranslation()
  const brandsBreadcrumbs: Array<PageLink> = [
    {
      title: t('Advertisements'),
      path: '/apps/advertisements/all',
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
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t('Advertisements')}</PageTitle>
              <ItemsList />
            </>
          }
        />
        
        <Route
          path='/add-advertisement'
          element={
            <>
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t('Advertisements')}</PageTitle>
              <AddUpdateItemForm />
            </>
          }
        />
        <Route
          path='/update-advertisement/:id'
          element={
            <>
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t('Advertisements')}</PageTitle>
              <AddUpdateItemForm />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/advertisements/all' />} />
    </Routes>
  )
}

export default ItemsPage
