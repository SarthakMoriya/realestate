/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { request } from '../../utils/fetchApi'

import { arrPriceRanges } from '../../utils/indexToPriceRange'
import { continentToIdx } from '../../utils/indexToContinent'

const Properties = () => {
  const [state, setState] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([])
  const navigate = useNavigate();
  const query = useLocation();
  // console.log(query?.search.slice(1))
  const arrQuery = query.search.slice(1).split('&')
  // console.log(arrQuery)//we got like this: ['type=beach', 'continent=1', 'priceRange=2']

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
      console.log(formattedQuery)
    }
  }, [allProperties])

  const handleSearch = (param = state) => {
    let options;
    //we either pass the formatedQuery or the event , that's why we do the if/else
    if (param?.nativeEvent) options = state // here is react state we created above
    else options = param//here is formattedquery
    // formattedQuery={priceRange:2,continet:3,type='beach'}
    const filteredProperties = allProperties.filter((property) => {
      console.log(property)
      //options.priceRange=2 --> arrPriceRange[2] --> "200000-300000"
      const priceRange = arrPriceRanges[options.priceRange];
      const minPrice = priceRange.split('-')[0];
      const maxPrice = priceRange.split('-')[1];

      //getting continentIndex
      const continent = continentToIdx(property.continent);
      console.log(continent)

      if (property.type === options.type
        && continent === property.continent
        && property.price >= minPrice
        && property.price <= maxPrice) {
        return property
      }
    })

    const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRange}`

    navigate(`/properties?${queryStr}`, { replace: true })
    setFilteredProperties(filteredProperties)
  }
  return (
    <div>Properties</div>
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

