
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { KTSVG } from '_metronic/helpers'
import { ItemModal } from './ItemModal'

function CarsListHeader (props:any){
  const {t}=useTranslation()
  const {setSearchTerm,searchTerm,getData}=props
  const [isModalOpen,setIsModalOpen]=useState(false)
  // const openAddUserModal = () => {
  //   setIsModalOpen(true)
  // }
  return (
    <>
    <div className='d-flex align-items-center justify-content-between w-100 p-5'>
      {/* <div className='card-title mb-0'>
        <div className='d-flex align-items-center position-relative '>
          <KTSVG
            path='/media/icons/duotune/general/gen021.svg'
            className='svg-icon-1 position-absolute ms-6'
          />
          <input
            type='text'
            data-kt-user-table-filter='search'
            className='form-control form-control-solid w-250px ps-14'
            placeholder='Search user'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div> */}
      <Link to='/apps/products/add-product' type='button' className={`btn btn-primary ms-auto `} >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          {t('Add Product')}
      </Link>
      {/* <ItemModal getData={getData}/> */}
      
    </div>
    </>
  )
}

export {CarsListHeader}
