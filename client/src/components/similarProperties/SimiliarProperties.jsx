/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { request } from '../../utils/fetchApi'
import './SimilarProperties.css'

const SimiliarProperties = () => {
    const [propertyDetails, setPropertyDetails] = useState('')
    const [similarProperties, setSimilarProperties] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();
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

    const fetchSimilarProperties = async () => {
        try {
            const data = await request(`/property/find/type/${propertyDetails.type}`, 'GET')
            setSimilarProperties(data)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => { fetchSimilarProperties() }, [propertyDetails])
    return (
        <div className='similar-properties-container'>
            <div className="titles"><h1>Similar Properties</h1></div>
            <div className="similar-properties-box">
                {similarProperties.map(property => {
                    console.log(property?._id)
                    return <div key={property?._id} onClick={() => { navigate(`/propertyDetail/${property?._id}`) }}>
                        <img src={`https://estate-jpzw.onrender.com/images/${property?.img}`} alt="" />
                        <div className="text-5xl">{property.title}</div>
                    </div>
                })}

            </div>
        </div>
    )
}

export default SimiliarProperties