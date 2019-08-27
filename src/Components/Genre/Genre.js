import React, { useState, useEffect } from 'react'
import api from '../../Services/api'
import Header from '../Header/Header'
import { Button } from 'reactstrap'

function Genre() {

    const [data, setData] = useState([]) //Estado que armazena os gêneros
    const [showButton, setShowButton] = useState({ showButtonSave: true, showButtonEdit: false }) //Estado para exibir botão de SALVAR ou ALTERAR
    const [msgError, setMsgError] = useState(false) //Estado para exibir as mensagens de erro quando os input's estão vazios

    useEffect(() => { //Executa sempre que o componente estiver montado
        getAllGenres() //Executa a função que busca todos os gêneros na API
    }, [])

    const getAllGenres = () => { //Função que busca todos os gêneros na API
        api.get('/genres') //Requisição GET para a rota /api
             .then(res => { setData(res.data) }) //Atribui o resultado retornado ao estado 'data'
    }

    const saveNewGenre = async () => { //Função para SALVAR um novo gênero

        let genre = await document.querySelector('#name_genre').value //Recupera o valor digitado no input 'name_genre'

        if (genre !== '') { //Executa caso o valor do input NÃO seja vazio ('')
            await api.post('/genres', { //Requisição POST para a rota /api
                name_genre: genre //Atribui o valor recuperado do input à chave 'name_genre' que será enviado à API para salvar no banco
            })
            .then(document.querySelector('#name_genre').value = '') //Limpa o valor contido no input
            .then(setMsgError(false)) //Retira msg de erro, caso esteja sendo exibida
        } else { //Executa caso o valor do input SEJA vazio ('')
            setMsgError(true) //Exibe msg de erro para o usuário
        }

        getAllGenres() //Executa a função que busca todos os gêneros na API (ATUALIZA OS DADOS)

    }

    const editGenre = async (id, name) => { //Executa quando o botão ALTERAR é acionado

        await setShowButton({ showButtonSave: false, showButtonEdit: true }) //Altera a exibição entre os botões SALVAR e ALTERAR
        document.querySelector('#name_genre').value = `${name}` //Atribui ao input 'name_genre' o valor recuperado da linha clicada
        document.querySelector('#id_genre').value = id //Atribui ao input 'id_genre' o valor recuperado da linha clicada
        setMsgError(false) //Retira msg de erro, caso esteja sendo exibida

    }

    const updateGenre = async () => { //Executa quando o botão ALTERAR é acionado

        let id = await document.querySelector('#id_genre').value //Recupera o valor do input 'id_genre'
        let name = await document.querySelector('#name_genre').value //Recupera o valor do input 'name_genre'

        if (name !== '') { //Executa caso o valor do input NÃO seja vazio ('')
            await api.put(`/genres/${id}`, { //Requisição PUT para a rota /api/genres/:id, sendo esse ID o recuperado acima
                name_genre: name //Atribui o valor recuperado do input à chave 'name_genre' que será enviado à API para atualizar no banco
            })
            .then(setShowButton({ showButtonSave: true, showButtonEdit: false })) //Altera a exibição entre os botões ALTERAR e SALVAR
            .then(setMsgError(false)) //Retira msg de erro, caso esteja sendo exibida
        } else { //Executa caso o valor do input SEJA vazio ('')
            setMsgError(true) //Exibe msg de erro para o usuário
        }

        getAllGenres() //Executa a função que busca todos os gêneros na API (ATUALIZA OS DADOS)

    }

    const cancelUpdate = () => { //Função que cancela a edição de um gênero
        setShowButton({ showButtonSave: true, showButtonEdit: false }) //Altera a exibição entre os botões ALTERAR e SALVAR
        setMsgError(false) //Retira msg de erro, caso esteja sendo exibida
    }

    const deleteGenre = async id => { //Função que deleta um gênero
        await api.delete(`/genres/${id}`) //Requisição DELETE para a rota /api/genres/:id, sendo esse ID o passado ao chamar a função
        getAllGenres() //Executa a função que busca todos os gêneros na API (ATUALIZA OS DADOS)
    }

    const renderRowTable = record => { //Função que renderiza linhas na tabela de gêneros
        return( //Retorna uma linha com ID, Gênero e as ações para cada ítem do array
            <tr key={record.id_genre}>
                <th scope="row">{record.id_genre}</th>
                <td>{record.name_genre}</td>
                <td>
                    <button type='button' className='btn btn-sm btn-warning' onClick={() => editGenre(record.id_genre, record.name_genre)}> &#9998; </button>&nbsp;
                    <button type='button' className='btn btn-sm btn-danger' onClick={() => deleteGenre(record.id_genre)}> &#10008; </button> 
                </td>
            </tr>
        )
    }

    return(
        <div>
            <Header />
            <div className='container mt-5 text-center'>
                <h1 className='text-dark'>Gêneros</h1>
                <form className='form-inline mb-3 justify-content-center'>
                    <div className='form-group'>
                        {showButton.showButtonSave && //Será mostrado em tela sempre que o componente for iniciado
                            <div>
                                <input type='text' className='form-control mr-1 mb-1' id='name_genre' name='name_genre' />
                                <Button color='primary' className='mb-1' onClick={() => saveNewGenre()}>SALVAR</Button>
                                <div>
                                    {msgError && //Será mostrado em tela sempre que o botão SALVAR for acionado e o valor do input for '' (vazio)
                                        <small className='text-danger'>É necessário informar o nome do Gênero.</small>
                                    }
                                </div>
                            </div>
                        }
                        {showButton.showButtonEdit && //Será mostrado em tela sempre que o botão EDITAR for acionado
                            <div>
                                <input type='hidden' readOnly className='form-control mr-1' id='id_genre' name='id_genre' />
                                <input type='text' className='form-control mr-1 mb-1' id='name_genre' name='name_genre' />
                                <Button color='warning' className='mr-1 mb-1' onClick={() => updateGenre()}>ALTERAR</Button>
                                <button className='btn btn-secondary mb-1' onClick={() => cancelUpdate()}>CANCELAR</button>
                                <div>
                                    {msgError && //Será mostrado em tela sempre que o botão ALTERAR for acionado e o valor do input for '' (vazio)
                                        <small className='text-danger'>É necessário informar o nome do Gênero ou clique em CANCELAR</small>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </form>
                <table className="table table-sm table-hover table-bordered table-striped table-dark">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">GÊNERO</th>
                            <th scope="col">AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'> 
                        {data.map(renderRowTable)} 
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Genre