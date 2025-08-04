
import { ItemModal } from './ItemModal'

function ItemsListHeader (props:any){
  const {getData}=props
  // const [isModalOpen,setIsModalOpen]=useState(false)
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
      <ItemModal getData={getData}/>
      
    </div>
    </>
  )
}

export {ItemsListHeader}
