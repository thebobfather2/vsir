import React from 'react'
import './Launchpad.css'
import Baad from '../images/baad.png'
import nftc from '../images/nftc.png'

const EddFox = () => {
    return (

        <div className='LaunchpadMain'>
            <h1 className='LaunchpadTitle'> Launchpad </h1>
            <h3 style={{ marginTop: '-1px' }}>Teamwork makes the Dream Work</h3>
            <br></br>
            <img className='Baad' src={Baad} alt='Baad' />
            <h3 style={{ marginTop: '15px' }}>Baad Goats</h3>
            <br></br>

           <div style={{  width: '80%' }}>1 Sol</div>
            <h3 style={{ marginTop: '30px' }}>Now</h3>
            <div style={{ marginTop: '10px' }}>As Seen On:</div>
            <a href="https://nftcalendar.io/event/edd-fox/">
                <img className='Baad' src={Baad} alt='Baad'  style={{ marginTop: '15px', marginBottom: '30px' }}></img></a>
        </div>

    )
}



export default EddFox