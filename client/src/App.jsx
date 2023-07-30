import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import Properties from './components/properties/Properties';
import PropertyDetails from './components/propertyDetails/PropertyDetails';
import PopularProperties from './components/popularProperties/PopularProperties'
import Hero from './components/hero/Hero';
import Newsletter from './components/newsletter/Newsletter';
import FeaturedProperties from './components/featuredProperties/FeaturedProperties';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar />
            <Hero />
            <PopularProperties />
            <FeaturedProperties />
            <Newsletter />
            <Footer />
          </>
        }
        />

        <Route path='/properties' element={
          <>
            <Navbar />
            <Properties />
            <Footer />
          </>
        }
        />
        <Route path='/propertyDetail/:id' element={
          <>
            <Navbar />
            <PropertyDetails />
            <Footer />
          </>
        }
        />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
