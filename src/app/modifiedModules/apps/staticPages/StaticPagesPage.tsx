import { useTranslation } from 'react-i18next'
import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { GeneralSettingsList } from './components/GeneralSettingsList'


const StaticPagesPage = () => {
  const {t} = useTranslation()
  const brandsBreadcrumbs: Array<PageLink> = [
    {
      title: t('Static Pages'),
      path: '/apps/static-pages/all',
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
              <PageTitle breadcrumbs={brandsBreadcrumbs}>{t('Static Pages')}</PageTitle>
              <GeneralSettingsList />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/static-pages/all' />} />
    </Routes>
  )
}

export default StaticPagesPage
