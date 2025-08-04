import {KTCard} from '../../../../../_metronic/helpers'
import ContactusTable from './ContactusTable'
import { ContactusHeader } from './ContactusHeader'
import { useEffect, useState } from 'react'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ContactUsList = () => {
  const {t} =useTranslation()
  const [searchTerm,setSearchTerm]=useState('')
  const [contactUs,setContactUs]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [pages,setPages]=useState(null)
  const [isLoading,setIsLoading]=useState(false)
  const [isDeleting,setIsDeleting] =useState<[Boolean]>([false])
    function getAllBooksRequests(){
        setIsLoading(true)
        axiosConfig.get(`/contact-us?page=${currentPage}&name=${searchTerm}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then(res=>{
            setIsLoading(false)
            setContactUs(res.data.data.data)
            setPages(res.data.data.pages)
            let deletedNumber:any = [...Array(res.data.data.count)]
            setIsDeleting(deletedNumber)
        }).catch(err=>{
            setIsLoading(false)
            console.log(err)
        })
    }
    function deleteItem(deltedId:String ,index:any){
      const modifiedDelete:[Boolean]=[...isDeleting]
      modifiedDelete[index]=true
      setIsDeleting(modifiedDelete)
        axiosConfig.delete(`/contact-us/delete-contact-us/${deltedId}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then(res=>{
            modifiedDelete[index]=false
            setIsDeleting(modifiedDelete)
            toast.success(t('Item Deleted Successfully'))
            getAllBooksRequests()
        }).catch(err=>{
            modifiedDelete[index]=false
            setIsDeleting(modifiedDelete)
            toast.error(err?.response?.data?.message)
            console.log(err)
        })
    }
  useEffect(()=>{
    getAllBooksRequests()
  },[currentPage,searchTerm])
  return (
    <>
      <KTCard>
        <ContactusHeader 
          setSearchTerm={setSearchTerm} 
          searchTerm={searchTerm}
          getData={getAllBooksRequests}
        />
        <ContactusTable  
          isLoading={isLoading}
          deleteItem={deleteItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={contactUs}
          pages={pages}
          getData={getAllBooksRequests}
          isDeleting={isDeleting}
        />
      </KTCard>
    </>
  )
}

export {ContactUsList}
