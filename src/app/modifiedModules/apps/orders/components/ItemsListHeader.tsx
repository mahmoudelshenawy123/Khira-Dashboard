
import { useTranslation } from 'react-i18next'
import { ItemModal } from './ItemModal'

function ItemsListHeader (props:any){
  const {getData,orderNumberSearch,setOrderNumberSearch,searchTerm,setSearchTerm}=props
  const {t} =useTranslation()
  // const [isModalOpen,setIsModalOpen]=useState(false)
  // const openAddUserModal = () => {
  //   setIsModalOpen(true)
  // }
  return (
    <>
    <div className='d-flex align-items-center justify-content-between w-100 p-5'>
      <div className='card-title mb-0'>
        <div className='d-flex align-items-center position-relative '>
          {/* <KTSVG
            path='/media/icons/duotune/general/gen021.svg'
            className='svg-icon-1 position-absolute ms-6'
          /> */}
          <div className='me-5'>
            <input
              type='text'
              data-kt-user-table-filter='search'
              className='form-control form-control-solid  ps-14'
              placeholder={`${t('Search By Order Number')}`}
              value={orderNumberSearch}
              onChange={(e) => setOrderNumberSearch(e.target.value)}
              />
          </div>
          <div>
            <input
              type='text'
              data-kt-user-table-filter='search'
              className='form-control form-control-solid w  ps-14'
              placeholder={`${t('Search By Order Phone')}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>
        </div>
      </div>
      {/* <ItemModal getData={getData}/> */}
      
    </div>
    </>
  )
}

export {ItemsListHeader}
