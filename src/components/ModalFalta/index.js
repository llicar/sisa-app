import React from 'react';
import { useState } from 'react'

import { IoCloseCircle } from 'react-icons/io5';

import { useModal } from './../../contexts/modalContext';
import Modal from './style'

const ModalFalta = (
    {
        id = 'modal',
        children,
        statusFalta
    }) => {

  
    const {setIsModalVisible,setIsModalDeslVisible} = useModal();// Controla a visibilidade do modal
    const {setDisableButton} = useModal();
    

    //funçao para oculta o modal
    const onClose = () => {
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

    Modal.defaultProps = {
        statusFalta: "white"
    }
    if (statusFalta === 'descontar') {
        Modal.defaultProps.statusFalta = "#F16C6C"
    }
    if (statusFalta === 'análise') {
        Modal.defaultProps.statusFalta = "#F2CB00"
    }
    if (statusFalta === 'abonar') {
        Modal.defaultProps.statusFalta = "#7BF587"
    }
  
    return (

        <Modal al id="modal" onClick={handleOutsideClick}>
            <div className="container">
                <IoCloseCircle className="close" onClick={onClose}></IoCloseCircle>
                <div className="content">
                    {children}
                </div>  
            </div>
        </Modal>


    )

}

export default ModalFalta;