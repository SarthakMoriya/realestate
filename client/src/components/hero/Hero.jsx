import { useState } from 'react'
import classes from './Hero.module.css'
import {AiOutlineSearch} from 'react-icons/ai'

const Hero = () => {
  const [type, setType] = useState('beach')
  const [priceRange, setPriceRange] = useState(100000)
  const [continent, setContinent] = useState('asia')
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your perfect dream house</h2>
        <h5>Search the best selection of luxury real estate</h5>

        <div className={classes.options}>
          <select onChange={(e) => { setType(e.target.value) }} value={type}>
            <option disabled>Select Type</option>
            <option value='mountains'>Mountain</option>
            <option value='beach'>Beach</option>
            <option value='village'>Village</option>
          </select>

          <select onChange={(e) => { setPriceRange(e.target.value) }} value={priceRange}>
            <option disabled>Select Price Range</option>
            <option value='0'>0-1,00,000</option>
            <option value='1'>1,00,000-3,00,000</option>
            <option value='2'>3,00,000-5,00,000</option>
            <option value='3'>5,00,000-10,00,000</option>
            <option value='4'>10,00,000+</option>
          </select>
          <select onChange={(e) => { setContinent(e.target.value) }} value={continent}>
            <option disabled>Select Continent</option>
            <option value='asia'>Asia</option>
            <option value='africe'>Africe</option>
            <option value='south'>South America</option>
            <option value='north'>North America</option>
            <option value='ocena'>Oceania</option>
          </select>
          <AiOutlineSearch className={classes.searchIcon}/>
        </div>
      </div>
    </div>
  )
}

export default Hero