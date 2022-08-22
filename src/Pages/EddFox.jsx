import React from 'react'
import './EddFox.css'
import family from '../images/family.png'
import nftc from '../images/nftc.png'

const EddFox = () => {
    return (

        <div className='EddFoxMain'>
            <h1 className='EddFoxTitle'>Edd Fox </h1>
            <h3 style={{ marginTop: '-1px' }}>Rabbits are friends, not food!</h3>
            <br></br>
            <img className='family' src={family} alt='family' />
            <h3 style={{ marginTop: '15px' }}>Meet Reuben</h3>
            <br></br>

           <div style={{  width: '80%' }}>Reuben Lacy, who holds a degree in industrial design from Auburn University, is a designer to his core. When he began to engage on a deeper level with the Bobby Rabbits, so many ideas and concepts were thrown around that we just knew he was going to become a creator. When he brought us the concept of Edd Fox, it was clear that this was an expansion of the Bobby Rabbits universe and storyline. Since graduating from Auburn, Reuben has used his degree and honed his skills by doing freelance work as well as landing an Art Department manager position with Uber Prints in 2018, located in Athens, Georgia. He currently resides in Carlin, Nevada with his wife and three kids, and of course his trusty stead, Bruno Calzone Lacy (dog). He enjoys everything design and if you've been a part of his Discord, you'll quickly notice that everything is used for inspiration.  He enjoys camping with his family and his favorite hobby is fishing, by any means necessary. Join the Discord and get to know him here: <a href="https://discord.gg/GQgN7kSDVn/" target="_blank"> https://discord.gg/GQgN7kSDVn </a></div>
            <h3 style={{ marginTop: '30px' }}>Minting September 27, 2022</h3>
            <div style={{ marginTop: '10px' }}>As Seen On:</div>
            <a href="https://nftcalendar.io/event/edd-fox/">
                <img className='nftc' src={nftc} alt='nftc'  style={{ marginTop: '15px', marginBottom: '30px' }}></img></a>
        </div>

    )
}



export default EddFox