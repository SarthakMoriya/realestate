/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import classes from './Property.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { request } from '../../utils/fetchApi'

import { arrPriceRanges } from '../../utils/indexToPriceRange'
import { continentToIdx } from '../../utils/indexToContinent'
import person from '../../assets/person.jpg'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'

const Properties = () => {
  const [state, setState] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([])
  const navigate = useNavigate();
  const query = useLocation();
  console.log(query?.search.slice(1))
  const arrQuery = query.search.slice(1).split('&')
  console.log(arrQuery)//we got like this: ['type=beach', 'continent=1', 'priceRange=2']

  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  //Fetch all properties
  const fetchAllProperties = async () => {
    const data = await request('/property/getall', 'GET');
    setAllProperties(data);//set array of properties
  }
  useEffect(() => {
    fetchAllProperties();
  }, [])

  //parse query params
  useEffect(() => {
    if (arrQuery && allProperties.length > 0 && state === null) {
      let formattedQuery = {}
      arrQuery.forEach((option, index) => {
        const key = option.split('=')[0];
        const value = option.split('=')[1];

        formattedQuery = { ...formattedQuery, [key]: value }

        //if we are on last index , assign the formattedQuery object to state
        if (index === arrQuery.length - 1) {
          setState(formattedQuery)
          handleSearch(formattedQuery)
        }
      })
      // console.log(formattedQuery)
    }
  }, [allProperties, arrQuery])

  const handleSearch = (param = state) => {
    console.log(state)
    let options;
    //we either pass the formatedQuery or the event , that's why we do the if/else
    if (param?.nativeEvent) options = state // here is react state we created above
    else options = param//here is formattedquery
    // formattedQuery={priceRange:2,continet:3,type='beach'}
    const filteredProperties = allProperties.filter((property) => {
      // console.log(property)
      //options.priceRange=2 --> arrPriceRange[2] --> "200000-300000"
      const priceRange = arrPriceRanges[options.priceRange];
      const minPrice = Number(priceRange.split('-')[0]);
      const maxPrice = Number(priceRange.split('-')[1]);

      //getting continentIndex
      const continent = continentToIdx(property.continent);
      // console.log(property, options)
      // console.log(continent, options.continent)
      // console.log(continent == options.continent)
      // console.log(property.price, minPrice, maxPrice)
      console.log(property.type, options.type, property.type == options.type)
      if (property.type == options.type
        && continent == options.continent
        && property.price >= minPrice
        && property.price <= maxPrice) {
        return property
      }
    })
    // console.log(filteredProperties)
    const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRange}`

    navigate(`/properties?${queryStr}`, { replace: true })
    setFilteredProperties(filteredProperties)
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
          <select value={state?.type} name='type' onChange={(e) => { handleState(e) }}>
            <option disabled>Select Type</option>
            <option value='mountain'>Mountain</option>
            <option value='beach'>Beach</option>
            <option value='village'>Village</option>
          </select>

          <select value={state?.priceRange} name='priceRange' onChange={(e) => { handleState(e) }}>
            <option disabled>Select Price Range</option>
            <option value="0">0-100,000</option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000-500,000</option>
          </select>
          <select value={state?.continent} name='continent' onChange={(e) => { handleState(e) }}>
            <option disabled>Select Continent</option>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">South America</option>
            <option value="4">North America</option>
            <option value="5">Oceania</option>
          </select>
          <button className={classes.searchBtn}>
            <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
          </button>
        </div>
        {
          filteredProperties.length > 0 ? <>
            <div className={classes.titles}>
              <h2>Selected Properties</h2>
              <h5>Property you may like</h5>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map(property => {
                return (<div key={property._id} className={classes.property}>
                  <Link
                    className={classes.imgContainer}
                    to={`/propertyDetail/${property._id}`}>
                    <img src={`http://localhost:5000/images/${property.img}`} alt="" />
                  </Link>
                  <div className={classes.details}>
                    <div className={classes.priceAndOwner}>
                      <span className={classes.price}>${property.price}</span>
                      <img src={person} alt="" className={classes.owner} />
                    </div>
                    <div className={classes.moreDetails}>
                      <span>{property.beds} beds <FaBed className={classes.icon} /></span>
                      <span>{property.sqmeters} square meters<FaSquareFull className={classes.icon} /></span>
                    </div>
                    <div className={classes.desc}>{property.desc}</div>
                  </div>
                </div>)
              })}
            </div>
          </> : <h2 className={classes.noProperty}>We have no properties with the specified options</h2>
        }
      </div>
    </div>
  )
}

export default Properties


/**
 * this component gets loaded whenever we search using hero section or select from the beach village mountain component we get url like
 * http://localhost:5173/properties?type=beach&continent=1&priceRange=2
 * we extract the queryString into formattedQuery Object like this {continent:'1', priceRange:'2',type:'beach'}
 * arrQuery=[continent:'1', priceRange:'2',type:'beach']
 * 
 *      //if we are on last index , assign the formattedQuery object to state , still dont know why to do this setState(formattedQuery)
        if (index === arrQuery.length - 1) {
          setState(formattedQuery)
          handleSearch(formattedQuery)
        }
        handleSearch functions on simple terms set the filteredProperties match the crieteria of the queryString like price range continent type
 * 
        depending upon wheather user selected from property type in home page aur he searched using herro section we dispaly properties in jsx
 * 
  1st useEffect is used to fetch all the properties available and change the state --> allProperties
  
 */

