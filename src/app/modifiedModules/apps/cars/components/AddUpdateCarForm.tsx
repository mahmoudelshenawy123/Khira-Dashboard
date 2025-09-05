import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { KTSVG } from '_metronic/helpers'
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";
import { useNavigate, useParams } from 'react-router-dom'
import Resizer from "react-image-file-resizer";
import { v4 as uuidv4 } from 'uuid';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next'
const SIEZE_MODAL = (id:any)=>{
    return{
        id:id,
        title_en:'',
        title_ar:'',
        price:'',
        price_before_discount:'',
        quantity:'',
    }
}
function AddUpdateCarForm() {
    const {t}=useTranslation()
    const navigate=useNavigate()
    const params = useParams()
    const [car,setCar]=useState<any>(null)
    const [isLoading,setIsLoading]=useState(false)
    const [nameEn,setNameEn]=useState('')
    const [nameAr,setNameAr]=useState('')
    const [descriptionEn,setDescriptionEn]=useState('')
    const [descriptionAr,setDescriptionAr]=useState('')
    const [priceBeforeDiscount,setPiceBeforeDiscount]=useState('')
    const [sizes,setSizes]=useState<any>([SIEZE_MODAL(uuidv4())])

    const [image,setImage]=useState<any>([])
    const [images,setImages]=useState<any>([])

    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState<any[]>([])

    function addSize(){
        let modifiedSizes = [...sizes]
        modifiedSizes.push(SIEZE_MODAL(uuidv4()))
        setSizes(modifiedSizes)
    }

    function deleteSize(id:any){
        let modifiedSizes = [...sizes]
        modifiedSizes = modifiedSizes.filter(size=>size?.id!=id)
        setSizes(modifiedSizes)
    }

    function handleChangeSize(value:any,name:any,index:any){
        let modifiedSizes = [...sizes]
        modifiedSizes[index][name]=value
        setSizes(modifiedSizes)
    }


    function getCar(){
        axiosConfig.get(`/product/single-product/${params.id}`).then(res=>{
            setCar(res?.data?.data?.product)
        }).catch(err=>{
            console.log(err)
        })
    }

    async function handleUploadedImage(e:any){
        let image = e.target.files[0];
        // let image:any = await new Promise((resolve) => {
        //     Resizer.imageFileResizer(
        //         e.target.files[0],
        //         520,
        //         520,
        //         "JPEG",
        //         100,
        //         0,
        //         (uri) => {
        //             console.log(uri)
        //             resolve(uri);
        //         },
        //         "file"
        //     );
        // });
        // console.log("e.target.files[0]", e.target.files[0], image)
        Object.assign(image, {
            preview: URL.createObjectURL(image),
        })
        setImage(image)
    }

    async function handleUploadedImages(e:any){
        let files =e.target.files
        let uploadedFile:any = [...images]
        if((files?.length+images?.length)>15){
            toast.error('You Can\'t upload more than 15 images')
            return
        }
        files = await Promise.all([...files].map(async(file) =>{
            // let image = file;
            let image:any = await new Promise((resolve) => {
                Resizer.imageFileResizer(
                    file,
                    520,
                    520,
                    "JPEG",
                    70,
                    0,
                    (uri) => {
                        console.log(uri)
                        resolve(uri);
                    },
                    "file"
                );
            });
            Object.assign(image, {
                preview: URL.createObjectURL(image),
            })
            uploadedFile.push(image)
        }))
        setImages(uploadedFile)
    }

    function getAllCategories() {
        axiosConfig.get(`/category/all-categories`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "accept-language": `en`,
            }
        }).then(res => {
            setCategories(res.data?.data)
        }).catch(err => {
            console.log(err)
            toast.error('Failed to load categories')
        })
    }
    useEffect(()=>{
        getAllCategories()
        if(params.id){
            getCar()
        }
    },[])

    function deleteImg(index:any){
        let modifiedImages=[...images]
        modifiedImages.splice(index,1)
        setImages(modifiedImages)
        console.log('modifiedImages',modifiedImages)
    }

    useEffect(()=>{
        setNameEn(car?.title_en)
        setNameAr(car?.title_ar)
        setDescriptionEn(car?.description_en)
        setDescriptionAr(car?.description_ar)
        setPiceBeforeDiscount(car?.price)
        setCategory(car?.category_id || '')

        setImage(car?.image?car?.image:[])
        setImages(car?.images?car?.images:[])

        setSizes(car?.sizes?car?.sizes:[])

    },[car])
        
    function validateInputs(){
        let status =true
        if(!nameEn){
            toast.error(t('Product English Name Is Required'))
            status=false
        }
        if(!nameAr){
            toast.error(t('Product English Name Is Required'))
            status=false
        }
        if(!priceBeforeDiscount){
            toast.error(t('Product Price Is Required'))
            status=false
        }
        if(!image){
            toast.error(t('Product image Is Required'))
            status=false
        }
        if(!(images&&images?.length!=0)){
            toast.error(t('Product images Is Required'))
            status=false
        }
        if (!category) {
            toast.error('Category is Required')
            status = false
        }
        return status
    }

    function addUpdateCar(){
        if(!validateInputs()){
        return
        }
        setIsLoading(true)
        const formData  = new FormData()
        formData.append('title_en',nameEn)
        formData.append('title_ar',nameAr)
        formData.append('description_en',descriptionEn)
        formData.append('description_ar',descriptionAr)
        formData.append('price',priceBeforeDiscount)
        formData.append('image',image)
        formData.append('category_id', category)
        images &&[...images].forEach(img=>{
            formData.append(`images[]`,img)
        })
        sizes &&[...sizes].forEach((size,index)=>{
            formData.append(`sizes[${index}][title_en]`,size?.title_en)
            formData.append(`sizes[${index}][title_ar]`,size?.title_ar)
            formData.append(`sizes[${index}][price]`,size?.price)
            formData.append(`sizes[${index}][price_before_discount]`,size?.price_before_discount)
            formData.append(`sizes[${index}][quantity]`, size?.quantity)
        })
        if(car){
            axiosConfig.put(`/product/update-product/${car.id}`,formData,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=>{
                setIsLoading(false)
                toast.success(t('Product Updated Successfully'))
                navigate('/apps/products/all')
            }).catch(err=>{
                setIsLoading(false)
                toast.error(t('Something went wrong'))
            })
        }else{
            axiosConfig.post(`/product/create-product`,formData,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=>{
                setIsLoading(false)
                toast.success(t('Product Added Successfully'))
                navigate('/apps/products/all')
            }).catch(err=>{
                setIsLoading(false)
                toast.error(t('Something went wrong'))
            })
        }
    }

  return (
    <div className='p-5 card'>
        <Row>
            <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='nameEn'>{t('Name English')}</label>
                    <input
                        type='text'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type English Name')}`}
                        id='nameEn'
                        value={nameEn}
                        onChange={(e) => setNameEn(e.target.value)}
                    />
                </div>
            </Col>
            <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='nameAr'>{t("Name Arabic")}</label>
                    <input
                        type='text'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type Arabic Name')}`}
                        id='nameAr'
                        value={nameAr}
                        onChange={(e) => setNameAr(e.target.value)}
                    />
                </div>
            </Col>
            <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='descEn'>{t('Description English')}</label>
                    <ReactQuill
                        className={' mb-5 '}
                        onChange={(data)=>setDescriptionEn(data)}
                        value={descriptionEn}
                        style={{height:'300px'}}
                        theme="snow" 
                        />
                </div>
            </Col>
            <Col sm='6' className='mb-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='descAr'>{t("Description Arabic")}</label>
                    <ReactQuill
                        className={' mb-5 '}
                        onChange={(data)=>setDescriptionAr(data)}
                        value={descriptionAr}
                        style={{height:'300px'}}
                        theme="snow" 
                    />
                </div>
            </Col>

            <Col sm='6' className='my-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='priceBeforeDiscount'>{t("Price")}</label>
                    <input
                        type='number'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type Price')}`}
                        id='priceBeforeDiscount'
                        value={priceBeforeDiscount}
                        onChange={(e) => setPiceBeforeDiscount(e.target.value)}
                    />
                </div>
            </Col>
            <Col sm='6' className='my-3'>
                    <div>
                        <label className='fs-5 text-muted mb-2' htmlFor='category'>Category</label>
                        <select
                            className='form-select form-select-solid'
                            id='category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value=''>Please Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.title}</option>
                            ))}
                        </select>
                    </div>
                </Col>
            
            <hr/>
            <div className='d-flex align-items-center my-4'>
                <label className='fs-5 text-muted mb-3' htmlFor='contactEmailNumber'>{t("Sizes")}</label>
                <button onClick={addSize} className='btn btn-primary ms-auto d-flex align-items-center justify-content-center '
                >{t('Add Size')}</button>
            </div>
            <hr/>
            {
                sizes &&sizes?.map((size:any,index:any)=>(
                    <Row key={index}>
                        <hr/>
                        <Col sm='6'>
                            <div>
                                <label className='fs-5 text-muted mb-0' htmlFor={`sizeTitleEn${index}`}>{t("Title English")}</label>
                                <input
                                    type='text'
                                    data-kt-user-table-filter='search'
                                    className='form-control form-control-solid mb-5 ps-14'
                                    placeholder={`${t('Type English Title')}`}
                                    id={`sizeTitleEn${index}`}
                                    value={size?.title_en}
                                    onChange={(e) => handleChangeSize(e.target.value,'title_en',index)}
                                />
                            </div>
                        </Col>
                        <Col sm='6'>
                            <div>
                                <label className='fs-5 text-muted mb-0' htmlFor={`sizeTitleAr${index}`}>{t("Title Arabic")}</label>
                                <input
                                    type='text'
                                    data-kt-user-table-filter='search'
                                    className='form-control form-control-solid mb-5 ps-14'
                                    placeholder={`${t('Type Arabic Title')}`}
                                    id={`sizeTitleAr${index}`}
                                    value={size?.title_ar}
                                    onChange={(e) => handleChangeSize(e.target.value,'title_ar',index)}
                                />
                            </div>
                        </Col>
                        <Col sm='6'>
                            <div>
                                <label className='fs-5 text-muted mb-0' htmlFor={`sizePrice${index}`}>{t("Price")}</label>
                                <input
                                    type='Number'
                                    data-kt-user-table-filter='search'
                                    className='form-control form-control-solid mb-5 ps-14'
                                    placeholder={`${t('Type price')}`}
                                    id={`sizePrice${index}`}
                                    value={size?.price}
                                    onChange={(e) => handleChangeSize(e.target.value,'price',index)}
                                />
                            </div>
                        </Col>
                        <Col sm='6'>
                            <div>
                                <label className='fs-5 text-muted mb-0' htmlFor={`sizePriceBeforeDiscount${index}`}>{t("Price Before Discount")}</label>
                                <input
                                    type='Number'
                                    data-kt-user-table-filter='search'
                                    className='form-control form-control-solid mb-5 ps-14'
                                    placeholder={`${t('Type Price Before Discount')}`}
                                    id={`sizePriceBeforeDiscount${index}`}
                                    value={size?.price_before_discount}
                                    onChange={(e) => handleChangeSize(e.target.value,'price_before_discount',index)}
                                />
                            </div>
                        </Col>
                        <Col sm='6'>
                            <div>
                                <label className='fs-5 text-muted mb-0' htmlFor={`sizeQuantity${index}`}>{t("Quantity")}</label>
                                <input
                                type='Number'
                                className='form-control form-control-solid mb-5 ps-14'
                                placeholder={`${t('Type quantity')}`}
                                id={`sizeQuantity${index}`}
                                value={size?.quantity}
                                onChange={(e) => handleChangeSize(e.target.value, 'quantity', index)}
                                />
                            </div>
                        </Col>
                        <Col sm='6'>
                        <button onClick={()=>deleteSize(size?.id)} 
                        className='btn btn-danger ms-auto d-flex align-items-center justify-content-center '
                            >{t('Delete')}</button>
                        </Col>
                        <hr/>
                    </Row>
                ))
            }
            
            

            <Col sm='12'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='carImage'>{t("Image")}</label>
                    <div>
                    <input
                        type='file'
                        data-kt-user-table-filter='search'
                        className='form-control form-control- mb-5 '
                        placeholder='Type Icon'
                        id='carImage'
                        onChange={(e:any) => handleUploadedImage(e)}
                    />
                    </div>
                    {
                        image&&(image?.preview||image?.length!=0)&&
                            <div>
                                <div className='mb-5 d-flex align-items-center justify-content-between'>
                                    <img src={image?.preview ?image?.preview:image} alt='img' style={{width:'100px',height:'100px'}}/>
                                    <button onClick={()=>{setImage(null)}}
                                    className='btn btn-danger ms-auto'>{t("Delete")}</button>
                                </div>
                            </div>
                    }
                </div>
            </Col>
            <Col sm='12'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='carimages'>{t("Images")}</label>
                    <div>
                    <input
                        type='file'
                        data-kt-user-table-filter='search'
                        className='form-control form-control- mb-5 '
                        placeholder='Type Icon'
                        id='carimages'
                        onChange={(e:any) => handleUploadedImages(e)}
                        multiple
                    />
                    </div>
                    <div>
                        {
                            images&&images.map((img:any,index:any)=>(
                                <div key={index} className='mb-5 d-flex align-items-center justify-content-between'>
                                    <img src={img?.preview ?img?.preview:img} alt='img' style={{width:'100px',height:'100px'}}/>
                                    <button onClick={()=>{deleteImg(index)}}
                                    className='btn btn-danger ms-auto'>
                                        {t("Delete")}
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Col>
            <div className='d-flex'>
                <button type='button' className='btn btn-primary ms-auto d-flex align-items-center justify-content-center w-100' onClick={addUpdateCar} disabled={isLoading}>
                    {
                    !isLoading?
                    <><KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />{car?t('Update'):t('Add')}{t('A Aew Product')}</>
                    :<ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
                }
                </button> 
            </div>

        </Row>
    </div>
  )
}

export default AddUpdateCarForm