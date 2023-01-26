import { Button } from '@material-ui/core'
import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='MainHomeContainer'>
        <Link to='/Radio'><Button className='EnterShop'>Enter VSIR</Button></Link>
    </div>
  )
}

export default Home