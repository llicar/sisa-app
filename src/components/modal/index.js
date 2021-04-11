import React from 'react';
import { useState } from 'react'


import JovemService from '../../services/jovens'

import styled from 'styled-components';
import { IoCloseCircle } from 'react-icons/io5';
import DotLoader from "react-spinners/DotLoader";

const Modal = styled.div`

width:100%;
height:100vh;
position:fixed;
top:0;
left:0;
bottom:0;
right:0;
z-index:999;
display:flex;
justify-content:center;
align-items:center;

background-color:rgba(0,0,0,0.6);



.container{
    //background-color:white;
    background-color: ${props => props.status};
    width:60%;
    height:500px;
    border-radius:10px;
    @media screen and (min-width: 0) and (max-width: 660px) {
            width:80%;
            display:block;
        }
    
}

.content{
    display:flex;
    text-align:center;
    font-family:Roboto-Light;
    justify-content:center;
    font-size:12px;
    

}

input{
           
    margin: 0 auto;
    display:flex;
    position:relative;
    bottom:-90px;
    
    width:100px;
    height:30px;
    align-items:center;
    justify-content:center;
    
    border-radius:7px;
    background-color:#1EC3BA;
    color:white;
    font-family:Roboto;
    border:none;
    font-size:20px;


    :hover{cursor: pointer;}
}

h1{
    display: flex;
    justify-content:center;
    align-items:center;
    width:100%;
    font-family:Roboto;
}

hr{
    width:70%;
}

.close{
    float:right;
    cursor:pointer;
    display:flex;
    width:40px;
    height:40px;
    color:#1EC3BA;
}

.resumoContainer{
    display: flex;
    width: 100%;
    margin-left:100px;
}

.tag{
    margin-right:20px;
    border-right:1px solid #1EC3BA;
    padding-right:5px;
    color:#1EC3BA;
}
.tag,.valuesInfo{
    width:40%;
}
.tag h2{
    text-align:right;
}
.valuesInfo h2{
    text-align:left;
}

.spinner{
    display:flex;
    margin: 0 auto;
    justify-content:center;
    align-items:center;
    height:100%;
}

.status{
    display:flex;
    margin:0 auto;
    justify-content:center;
    align-items:center;
    height:100%;
    border:1px solid black;
    width:100%;
}

.statusResponse{
    color:white;
    font-family:roboto;
    font-size:24
}
`
/**
 * 
 * @param {any} children Conteudo HTML a ser exibido 
 * @param {string} title Titulo do modal 
 * @param {object} data Dados a ser enviados para a API
 * @param {any} services Serviço a ser execultado
 * @param {any} paramId id da rota
 * @param {object} dataNote Dados da anotação
 * @param {any} onClose Função para fechar o modal
 * @param {any} isNoteVisible Controla a visibilidade do modal
 * @param {any} isNote Define se para realizar uma anotação ou não
 */
const ModalForm = (
    {
        id = 'modal',
        children,
        isNoteVisible,
        title,
        data,
        dataNote,
        service,
        paramId,
        isNote,
        onClose = () => { }
    }) => {

    //Estados
    const [loading, setLoading] = useState();
    const [response, setResponse] = useState();
    

    let onSubmit;

    if (isNote) {
        const fOnsubmit = async (data, paramId, dataNote) => {

            try{
                await service(data, paramId).catch(err => {
                    throw new Error('Não foi possivel atualizar os dados')
                })
                await JovemService.createNote(dataNote, paramId).catch(err => {
                    throw new Error('Não foi possivel inserir anotação')
                })
                setLoading(2)
                setResponse('Inserido com suscesso!')
            } catch(err) {
                setLoading(3)
                setResponse(err.message)
            }
        }
        onSubmit = fOnsubmit;

    } else {
        const fOnsubmit = async (data, paramId) => {
            try{
                await service(data,paramId).catch(err => {
                    throw new Error('Não foi possivel atualizar os dados')
                })
                setLoading(2)
                setResponse('Inserido com suscesso!')
            }catch(err){
                setLoading(3)
                setResponse(err.message)
            }                 
        }

        onSubmit = fOnsubmit;
    }

    // Definindo o background do Container de acordo com o estado do (loading)
    Modal.defaultProps = {
        status: "white"
    }

    if (loading === 2) {
        Modal.defaultProps.status = "#07D271"
    }

    if (loading === 3) {
        Modal.defaultProps.status = "#FA5757"
    }
    // -----------------------------------------------------------------------

    // Fecha o modal se clicar fora dele
    const handleOutsideClick = (e) => {
        if (e.target.id === id){
            onClose();
        } 
    }
    // ----------------------------------

    /**
     * Define oque irá ser renderizado após confirmar (spinner ou a resposta de status) 
     * dependendo do estado do (loading)
     */
    var status;

    if (loading === 1) {

        status = <div className="spinner">
            <DotLoader loading={loading} color={'#1EC3BA'} />
        </div>

    } else {

        status = <div className="statusResponse">
            <h1>{response}</h1>
        </div>
    }

    //-----------------------------------------------------------------------------

    return (

        <Modal id="modal" onClick={handleOutsideClick}>
            <div className="container">
                {!loading ?
                    <div>
                        <IoCloseCircle className="close" onClick={onClose}></IoCloseCircle>
                        <h1>{title}</h1>
                        <hr />
                        <div className="content">
                            {children}
                        </div>

                        {
                            isNote ?
                                !isNoteVisible ?
                                    <input
                                        type="button"
                                        onClick={() => {
                                            setLoading(1);
                                            onSubmit(data, paramId, dataNote)
                                        }}
                                        form="form"
                                        value="Sim" />
                                    : false
                                : <input
                                    type="button"
                                    onClick={() => {
                                        setLoading(1);
                                        onSubmit(data, paramId)
                                    }}
                                    value="Enviar"
                                />
                        }

                    </div>

                    :
                    <div className="status">{status}</div>
                }
            </div>
        </Modal>


    )

}

export default ModalForm;