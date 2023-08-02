/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import classes from './Featured.module.css'

import { request } from '../../utils/fetchApi';
import { useEffect, useState } from 'react';
import { FaBed, FaSquareFull } from 'react-icons/fa';

import fallbackimg from '../../assets/estate3.jpg';
import fallbackuser from '../../assets/person.jpg'

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([])

  const fetchFeaturedProperties = async () => {
    try {
      const data = await request('/property/find/featured', 'GET');
      console.log(data)
      setFeaturedProperties(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => { fetchFeaturedProperties() }, [])
  return (
    <div className={classes.container} id='featuredProperties'>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <h5>Properties You May Like</h5>
          <h2>Our Featured Properties</h2>
        </div>
        <div className={classes.featuredProperties}>
          {featuredProperties?.map((property) => {
            console.log(property)
            return (

              <div key={property?._id} className={classes.featuredProperty}>
                <Link to={`/propertyDetail/${property._id}`} className={classes.imgContainer}>
                  <img src={`http://localhost:5000/images/${property?.img}`} alt="" />
                  {/* <img src={fallbackimg} alt="" /> */}
                </Link>
                <div className={classes.details}>
                  <div className={classes.priceAndOwner}>
                    <span className={classes.price}>${property?.price}</span>
                    <img src={fallbackuser} alt="" className={classes.owner} />
                  </div>
                  <div className={classes.moreDetails}>
                    <span>{property?.beds} Beds<FaBed className={classes.icon} /></span>
                    <span>{property?.sqmeters} square meters<FaSquareFull className={classes.icon} /></span>
                  </div>
                  <div className={classes.desc}>
                    {property?.desc}
                  </div>
                </div>
              </div>
            )
          })}
        </div>


      </div>
    </div>
  )
}

export default FeaturedProperties