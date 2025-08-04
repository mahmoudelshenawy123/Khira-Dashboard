import {KTCard} from '../../../../../_metronic/helpers'
import ItemsTable from './ItemsTable'
import { ItemsListHeader } from './ItemsListHeader'
import { useEffect, useState } from 'react'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ItemsList = () => {
  const {t} =useTranslation()
  const [searchTerm,setSearchTerm]=useState('')
  const [items,setItems]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [pages,setPages]=useState(null)
  const [isLoading,setIsLoading]=useState(false)
  const [isDeleting,setIsDeleting] =useState<[Boolean]>([false])
  const [isActivating,setIsActivating] =useState<[Boolean]>([false])

    function getAllItems(){
        setIsLoading(true)
        axiosConfig.get(`/provider/all-providers?page=${currentPage}&name=${searchTerm}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then(res=>{
            setIsLoading(false)
            setItems(res.data.data.data)
            setPages(res.data.data.pages)
            let deletedNumber:any = [...Array(res.data.data.count)]
            setIsDeleting(deletedNumber)
            setIsActivating(deletedNumber)
        }).catch(err=>{
            setIsLoading(false)
            console.log(err)
        })
    }

    function deleteItem(deltedId:String ,index:any){
      const modifiedDelete:[Boolean]=[...isDeleting]
      modifiedDelete[index]=true
      setIsDeleting(modifiedDelete)
        axiosConfig.delete(`/user/delete-user/${deltedId}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then((res)=>{
            modifiedDelete[index]=false
            if(res?.data){
              setIsDeleting(modifiedDelete)
              toast.success(t('Item Deleted Successfully'))
              getAllItems()
            }
            else{
              modifiedDelete[index]=false
            setIsDeleting(modifiedDelete)
            toast.error(t('Something Went Wrong'))
            }
        }).catch(err=>{
            console.log(err)
            modifiedDelete[index]=false
            setIsDeleting(modifiedDelete)
            toast.error(err.response.data.message)
        })
    }

    function changeActiveStatus(userId:String ,index:any){
      const modifiedItems:[Boolean]=[...isActivating]
      modifiedItems[index]=true
      setIsActivating(modifiedItems)
        axiosConfig.put(`/provider/change-provider-status/${userId}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then((res)=>{
            modifiedItems[index]=false
            if(res?.data){
              setIsActivating(modifiedItems)
              toast.success(t('Item Status Changed Successfully'))
              getAllItems()
            }
            else{
            modifiedItems[index]=false
            setIsActivating(modifiedItems)
            toast.error(t('Something Went Wrong'))
            }
        }).catch(err=>{
            console.log(err)
            modifiedItems[index]=false
            setIsActivating(modifiedItems)
            toast.error(err.response.data.message)
        })
    }
  useEffect(()=>{
    getAllItems()
  },[currentPage,searchTerm])
  return (
    <>
      <KTCard>
        <ItemsListHeader 
          setSearchTerm={setSearchTerm} 
          searchTerm={searchTerm}
          getData={getAllItems}
        />
        <ItemsTable  
          isLoading={isLoading}
          isActivating={isActivating}
          deleteItem={deleteItem}
          changeActiveStatus={changeActiveStatus}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={items}
          pages={pages}
          getData={getAllItems}
          isDeleting={isDeleting}
        />
      </KTCard>
    </>
  )
}

export {ItemsList}
