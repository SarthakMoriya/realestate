/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { request } from '../../utils/fetchApi'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import classes from './PropertyDetails.module.css'
import { AiOutlineClose } from 'react-icons/ai'
import emailjs from '@emailjs/browser'
import SimiliarProperties from '../similarProperties/SimiliarProperties'

const PropertyDetails = () => {
  const { user } = useSelector(state => state.auth)
  const [propertyDetails, setPropertyDetails] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const { id } = useParams();
  const formRef = useRef();

  const serviceId = import.meta.env.VITE_SERVICE_ID
  const templateId = import.meta.env.VITE_TEMPLATE_ID
  const publickey = import.meta.env.VITE_PUBLIC_KEY
  console.log(serviceId, templateId, publickey)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request(`/property/find/${id}`, 'GET')
        setPropertyDetails(data);
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchDetails()
  }, [id])

  const handleCloseForm = () => {
    setShowForm(false);
    setTitle("");
    setDesc("");
  }

  const handleContactOwner = (e) => {
    e.preventDefault();
    emailjs.sendForm(serviceId, templateId, formRef.current, publickey)
      .then(result => console.log(result))
      .error(error => console.log(error))
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:5000/images/${propertyDetails?.img}`} alt="" />
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {propertyDetails?.title}
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndContinent}>
              <div className="">
                Type: <span>{propertyDetails?.type}</span>
              </div>
              <div className="">
                Continent: <span>{propertyDetails?.continent}</span>
              </div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price}>
                <span>Price: $</span>{propertyDetails?.price}
              </span>
              <span style={{ display: "flex", alignItems: "Center", gap: "12px" }}>
                Owner: <img src={`http://localhost:5000/images/${propertyDetails?.currentOwner?.photoUrl}`} alt="" className={classes.owner} />
              </span>
            </div>
            <div className={classes.moreDetails}>
              <span>{propertyDetails?.beds} Beds <FaBed className={classes.icon} />
              </span>
              <span>{propertyDetails?.dqmeters} Beds <FaSquareFull className={classes.icon} />
              </span>
            </div>
            <p className={classes.desc}>
              Desc: <span>{propertyDetails?.desc}</span>
            </p>
            <button onClick={() => { setShowForm(true) }}>
              Contact Owner
            </button>
          </div>
        </div>
      </div>
      {
        showForm && (
          <div className={classes.contactForm} onClick={handleCloseForm}>
            <div
              className={classes.contactFormWrapper}
              onClick={(e) => { e.stopPropagation() }}>
              <h2>Send email to owner</h2>
              <form ref={formRef} onSubmit={handleContactOwner}>
                <input value={user?.email} type="email" placeholder='My Email...' name='from_email' />
                <input value={user?.username} type="text" placeholder='My Username' name='from_username' />
                <input value={propertyDetails?.currentOwner?.email} type="email" placeholder='Owner Email...' name='to_email' />
                <input type="text" placeholder='Title...' name='from_title' />
                <input type="text" placeholder='Desc...' name='message' />
                <button>Send</button>
              </form>
              <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default PropertyDetails