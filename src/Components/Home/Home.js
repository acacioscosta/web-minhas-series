import React from 'react'
import Header from '../Header/Header'

function Home() {

    return(
        <div>
            <Header />
            <div className='container mt-5 text-center text-dark'>
                <h1 className='mb-5'>Home</h1>
                <h2 className='mb-5'>Bem vindo ao gerenciador de séries da Netflix</h2>
                <p className='lead'>Assista e controle suas séries</p>
            </div>
        </div>
    )

}

export default Home