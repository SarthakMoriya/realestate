import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Hero.module.css'
import { AiOutlineSearch } from 'react-icons/ai'

const Hero = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('beach')
  const [priceRange, setPriceRange] = useState(0)
  const [continent, setContinent] = useState(0)

  const handleSearch = () => {
    navigate(`/properties?type=${type}&continent=${continent}&priceRange=${priceRange}`)
    setType('beach');
    setPriceRange(1)
    setContinent('asia')
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your perfect dream house</h2>
        <h5>Search the best selection of luxury real estate</h5>

        <div className={classes.options}>
          <select onChange={(e) => { setType(e.target.value) }} value={type}>
            <option disabled>Select Type</option>
            <option value='mountain'>Mountain</option>
            <option value='beach'>Beach</option>
            <option value='village'>Village</option>
          </select>

          <select onChange={(e) => { setPriceRange(e.target.value) }} value={priceRange}>
            <option disabled>Select Price Range</option>
            <option value="0">0-100,000</option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000-500,000</option>
          </select>
          <select onChange={(e) => { setContinent(e.target.value) }} value={continent}>
            <option disabled>Select Continent</option>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">South America</option>
            <option value="4">North America</option>
            <option value="5">Oceania</option>
          </select>
          <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
        </div>
      </div>
    </div>
  )
}

export default Hero