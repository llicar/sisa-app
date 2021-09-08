import React from 'react';
import { useState } from 'react'

import JovemService from '../../services/jovens'

import { IoCloseCircle } from 'react-icons/io5';
import DotLoader from "react-spinners/DotLoader";
import { useModal } from './../../contexts/modalContext';
import Modal from './style'

import {Submit} from '../../components/input/index'

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
 */
const ModalForm = (
    {
        id = 'modal',
        children,
        title,
        data,
        service,
        paramId,
        type,
    }) => {

  
    const [loading, setLoading] = useState();
    const [response, setResponse] = useState();
    const {anotacao} = useModal();
    const {setIsModalVisible,setIsModalDeslVisible} = useModal();// Controla a visibilidade do modal
    const {isNoteVisible, setIsNoteVisible} = useModal();//Controla a visibilidade formulário de anotações
    const {setDisableButton} = useModal();
    
    const modalType = {
        
        default:    
        async (data, paramId) => {
            try{
                await service(data,paramId).catch(err => {
                    console.log(err)
                    throw new Error('Ops, algo deu errado!')
                    
                })
                setLoading(2)
                setResponse('Sucesso!')
            }catch(err){
                setLoading(3)
                setResponse(err.message)
            }                 
        },

        note:
        async (data, paramId, anotacao) => {

            try{
                await service(data, paramId).catch(err => {
                    throw new Error('Ops, algo deu errado!')
                })
                await JovemService.createNote(anotacao, paramId).catch(err => {
                    throw new Error('Não foi possivel inserir anotação')
                })
                setLoading(2)
                setResponse('Suscesso!')
            } catch(err) {
                setLoading(3)
                setResponse(err.message)
            }
        },
    }

    // Definindo o background do Container de acordo com o estado do (loading)
    Modal.defaultProps = {
        status: "rgba(36, 50, 64, 0.8)"
    }

    if (loading === 2) {
        Modal.defaultProps.status = "#07D271"
    }

    if (loading === 3) {
        Modal.defaultProps.status = "#FA5757"
    }
    // -----------------------------------------------------------------------

    //funçao para oculta o modal
    const onClose = () => {
        setIsNoteVisible(false)
        setIsModalVisible(false)
        setIsModalDeslVisible(false)
        setDisableButton(true)
    }
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

        <Modal    al id="modal" onClick={handleOutsideClick}>
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
                            type==='note' ?
                                !isNoteVisible ?
                                    <Submit
                                        className="btn-enviar"
                                        type="submit"
                                        onClick={() => {
                                            setLoading(1);
                                            modalType[type](data, paramId, anotacao)
                                        }}
                                        form="form"
                                        value="Sim" />
                                    : false
                                : <Submit
                                    className="btn-enviar"
                                    type="submit"
                                    onClick={() => {
                                        setLoading(1);
                                        modalType[type](data, paramId)
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