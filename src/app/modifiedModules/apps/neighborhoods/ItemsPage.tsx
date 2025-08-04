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
      title: t('Cities'),
      path: '/apps/cities/all',
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
          path='/all/:id'
          element={
            <>
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t('Neighborhoods')}</PageTitle>
              <ItemsList />
            </>
          }
        />
        <Route
          path='/add-neighborhood/:id'
          element={
            <>
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t('Neighborhoods')}</PageTitle>
              <AddUpdateItemForm />
            </>
          }
        />
        <Route
          path='/update-neighborhood/:id'
          element={
            <>
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t('Neighborhoods')}</PageTitle>
              <AddUpdateItemForm />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/neighborhoods/all/:id' />} />
    </Routes>
  )
}

export default ItemsPage
