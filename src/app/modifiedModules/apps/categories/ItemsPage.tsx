import { useTranslation } from 'react-i18next'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { ItemsList } from './components/ItemsList'
// import {BrandsListWrapper} from './users-list/BrandsList'


const ItemsPage = () => {
  const {t} =useTranslation()
  const brandsBreadcrumbs: Array<PageLink> = [
    {
      title: t('Categories'),
      path: '/apps/categories/all',
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
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t('Categories')}</PageTitle>
              <ItemsList />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/categories/all' />} />
    </Routes>
  )
}

export default ItemsPage
