import { Link } from 'react-router-dom'
import classes from './PopularProperties.module.css'

import img1 from '../../assets/realestatebeach.jpg';
import img2 from '../../assets/realestatecountryside.jpg';
import img3 from '../../assets/realestatemountain.jpg';
import { request } from '../../utils/fetchApi';
import { useEffect, useState } from 'react';

const PopularProperties = () => {
  const [numberOfProperties, setNumberOfProperties] = useState({})

  const fetchNumberOfProperties = async () => {
    try {
      const data = await request('/property/find/types', 'GET');
      console.log(data)
      setNumberOfProperties(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => { fetchNumberOfProperties() }, [])
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <h5>Different Types Of Properties</h5>
          <h2>Best Type Of Properties For You</h2>
        </div>
        <div className={classes.properties}>
          <Link to={`/properties/type/mountain`} className={classes.property}>
            <img src={img3} alt="" />
            <div className={classes.quantity}>{numberOfProperties.mountain} Properties</div>
            <h5>Mountain Properties</h5>
          </Link>
          <Link to={`/properties/type/village`} className={classes.property}>
            <img src={img2} alt="" />
            <div className={classes.quantity}>{numberOfProperties.village} Properties</div>
            <h5>Village Properties</h5>
          </Link>
          <Link to={`/properties/type/beach`} className={classes.property}>
            <img src={img1} alt="" />
            <div className={classes.quantity}>{numberOfProperties.beach} Properties</div>
            <h5>Beach Properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties

// <Link to={`/properties?type=beach&continent=1&priceRange=2`} className={classes.property}>
//   <img src={img1} alt="" />
//   <div className={classes.quantity}>{numberOfProperties.beach} Properties</div>
//   <h5>Beach Properties</h5>
// </Link>
// <Link to={`/properties?type=mountain&continent=1&priceRange=2`} className={classes.property}>
//   <img src={img3} alt="" />
//   <div className={classes.quantity}>{numberOfProperties.mountain} Properties</div>
//   <h5>Mountain Properties</h5>
// </Link>
// <Link to={`/properties?type=village&continent=1&priceRange=2`} className={classes.property}>
//   <img src={img2} alt="" />
//   <div className={classes.quantity}>{numberOfProperties.village} Properties</div>
//   <h5>Village Properties</h5>
// </Link> 
