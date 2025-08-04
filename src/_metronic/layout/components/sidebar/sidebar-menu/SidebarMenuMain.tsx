/* eslint-disable react/jsx-no-target-blank */
import { useTranslation } from 'react-i18next'
import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const {t} = useTranslation()
  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={t('Dashboard')} 
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>{t('Orders')}</span>
        </div>
      </div>
      
      <SidebarMenuItem
        to='/apps/orders/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Orders')}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/users/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Users')}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/categories/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Categories')}
        fontIcon='bi-layers'
      />
      {/* <SidebarMenuItem
        to='/apps/providers/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Providers')}
        fontIcon='bi-layers'
      /> */}
      <SidebarMenuItem
        to='/apps/products/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Products')}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/contact-us/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Contact Us')}
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>{t('Settings')}</span>
        </div>
      </div>
      <SidebarMenuItem
        to='/apps/admin/users/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Admin Users')}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/general-settings/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('General Settings')}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/static-pages/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Static Pages')}
        fontIcon='bi-layers'
      />
      {/* <SidebarMenuItem
        to='/apps/advertisements/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Advertisements')}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/cities/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Cities')}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/categories/all'
        icon='/media/icons/duotune/general/gen051.svg'
        title={t('Categories')}
        fontIcon='bi-layers'
      /> */}
    </>
  )
}

export {SidebarMenuMain}
