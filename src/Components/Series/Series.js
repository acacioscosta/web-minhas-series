import React, { useState, useEffect } from 'react'
import api from '../../Services/api'
import Header from '../Header/Header'
import { Button } from 'reactstrap'

function Series() {

    const [genres, setGenres] = useState([])
    const [series, setSeries] = useState([])
    const [status] = useState(['A assistir', 'Assistindo', 'Assistido'])
    const [msgError, setMsgError] = useState(false)
    const [showButton, setShowButton] = useState({ showButtonSave: true, showButtonEdit: false })

    useEffect(() => {
        api.get('/genres')
             .then(res => setGenres(res.data))
        
        getAllSeries()
    }, [])

    const getAllSeries = () => {
        api.get('/series')
             .then(res => setSeries(res.data))
    }

    const saveNewSerie = async () => {

        let name_serie = await document.querySelector('#serie').value
        let status_serie = await document.querySelector('#status').value
        let name_genre = await document.querySelector('#genre').value

        if (name_serie !== '') {
            await api.post('/series', {
                name_serie,
                status_serie,
                name_genre
            })
            .then(document.querySelector('#serie').value = '')
            .then(setMsgError(false))
        } else {
            setMsgError(true)
        }

        getAllSeries()

    }

    const editSerie = async (id, name_serie, status_serie, name_genre) => {

        await setShowButton({ showButtonSave: false, showButtonEdit: true })
        document.querySelector('#id_serie').value = id
        document.querySelector('#serie').value = `${name_serie}`
        document.querySelector('#status').value = `${status_serie}`
        document.querySelector('#genre').value = `${name_genre}`
        setMsgError(false)

    }

    const updateSerie = async () => {

        let id = await document.querySelector('#id_serie').value
        let name_serie = await document.querySelector('#serie').value
        let status_serie = await document.querySelector('#status').value
        let name_genre = await document.querySelector('#genre').value
        
        if (name_serie !== '') {
            await api.put(`/series/${id}`, {
                name_serie,
                status_serie,
                name_genre
            })
            .then(setShowButton({ showButtonSave: true, showButtonEdit: false }))
            .then(setMsgError(false))
            .then(document.querySelector('#serie').value = '')
        } else {
            setMsgError(true)
        }

        getAllSeries()

    }

    const cancelUpdate = () => {
        setShowButton({ showButtonSave: true, showButtonEdit: false })
        setMsgError(false)
        document.querySelector('#serie').value = ''
    }

    const deleteSerie = async id => {
        await api.delete(`/series/${id}`)
        getAllSeries()
        document.querySelector('#serie').value = ''
        setMsgError(false)
        setShowButton({ showButtonSave: true, showButtonEdit: false })
    }

    const renderRowTable = record => { //Função que renderiza linhas na tabela de gêneros
        return( //Retorna uma linha com ID, Gênero e as ações para cada ítem do array
            <tr key={record.id_serie}>
                <th scope="row">{record.id_serie}</th>
                <td>{record.name_serie}</td>
                <td>{record.status_serie}</td>
                <td>{record.name_genre}</td>
                <td>
                    <button type='button' className='btn btn-sm btn-warning' onClick={() => editSerie(record.id_serie, record.name_serie, record.status_serie, record.name_genre)}> &#9998; </button>&nbsp;
                    <button type='button' className='btn btn-sm btn-danger' onClick={() => deleteSerie(record.id_serie)}> &#10008; </button> 
                </td>
            </tr>
        )
    }

    const renderOptionGenre = optionGenre => {
        return(<option key={optionGenre.id_genre} value={optionGenre.name_genre}>{optionGenre.name_genre}</option>)
    }

    const renderOptionStatus = optionStatus => {
        return(<option key={optionStatus} value={optionStatus}>{optionStatus}</option>)
    }

    return(
        <div>
            <Header />
            <div className='container mt-5'>
                <h1 className='text-dark text-center'>Séries</h1>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="serie">Série</label>
                            <input type="text" className="form-control" id="serie" name='serie' />
                            {msgError && showButton.showButtonSave &&
                                <small className='text-danger'>É necessário informar o nome de uma série.</small>
                            }
                            {msgError && showButton.showButtonEdit &&
                                <small className='text-danger'>É necessário informar o nome de uma série ou clique em CANCELAR</small>
                            }
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="status">Status</label>
                            <select id="status" name='status' className="form-control">
                                {status.map(renderOptionStatus)}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="genre">Gênero</label>
                            <select id="genre" name='genre' className="form-control">
                                {genres.map(renderOptionGenre)}
                            </select>
                        </div>
                    </div>
                    {showButton.showButtonSave &&
                        <div className='text-center'>
                            <Button type="button" color='primary' className="mb-3" onClick={() => saveNewSerie()}>SALVAR</Button>
                        </div>
                    }
                    {showButton.showButtonEdit &&
                        <div className='text-center'>
                            <input type='hidden' className='form-control' id='id_serie' name='id_serie' />
                            <Button type="button" color='warning' className="mb-3 mr-1" onClick={() => updateSerie()}>ALTERAR</Button>
                            <Button type="button" color='secondary' className="mb-3" onClick={() => cancelUpdate()}>CANCELAR</Button>
                        </div>
                    }
                </form>
                <table className="table table-sm table-hover table-bordered table-striped table-dark">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">SÉRIE</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">GÊNERO</th>
                            <th scope="col">AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'> 
                         {series.map(renderRowTable)}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Series