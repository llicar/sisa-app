import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header'
import { HeaderContainer, Container, TableContainer, Headertable, Row, Cell, CellEtapa } from './style'

import { FaCalendarCheck } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { RiUserAddFill } from "react-icons/ri";
import{ FaArrowCircleRight } from 'react-icons/fa'
import { RiUserUnfollowFill } from 'react-icons/ri'

import SquareLoader from "react-spinners/SquareLoader";
import ModalForm from '../../components/modal';

import JovemService from '../../services/jovens'
import dataFormat from '../../utils/dataFormat'
import nada_aqui from '../../assets/images/nada_aqui.svg'
import { useModal } from '../../contexts/modalContext';

import Lottie from "lottie-react";
import animationLogo from '../../assets/animationLogo.json'




const Admissoes = () => {

    const [jovens, setJovens] = useState([{}]);
    const [loading,setLoading] = useState(false);
    const [total,setTotal] = useState();
    const [idDeleteJovem, setIdDeleteJovem] = useState();
    const {isModalVisible, setIsModalVisible} = useModal();

    useEffect(() => {

        async function buscarDados(){
            setLoading(true)
            const response  = await JovemService.jovensEmProcesso()
            setJovens(response.data);

            /**
             * calcula o total de jovens em processo
             * @param {*} data 
             */
            function totalJovens(data){
                let count = 0
                data.map(f =>{
                    count ++
                    return count
                })
                setTotal(count)
            }
            totalJovens(response.data)
            setLoading(false)
        }
        buscarDados()

    }, [])

    return (
        <body>

            <Header></Header>
            <Container>
                <HeaderContainer>
                    <h1>Admissões</h1>
                    <Link to='/CadastrarJovem'><RiUserAddFill size={60} color={'#fff'} /></Link>
                </HeaderContainer>
                {
                    loading?
                    <div style={{display: 'flex', width:'150px', margin: '0 auto',justifyContent: 'center',marginTop: '130px'}}>
                        <Lottie animationData={animationLogo} loop={true} />
                    </div>:
                    total?
                    <TableContainer>
                    <Headertable>
                        <Cell w={2}></Cell>
                        <Cell w={10}><h2>Admissão</h2></Cell>
                        <Cell w={30}><h2>Nome</h2></Cell>
                        <Cell w={25}><h2>Empresa</h2></Cell>
                        <Cell w={28}><h2>Etapa</h2></Cell>
                    </Headertable>
                    {
                        jovens.map(jovem => {
                            return (
                                <Row>
                                    <Cell w={2} style={{marginLeft:'10px'}}> 
                                        <RiUserUnfollowFill
                                            size={26} 
                                            color={'#ee5d5d'}
                                            onClick={() =>{
                                                setIsModalVisible(true)
                                                setIdDeleteJovem(jovem.id_jovem);
                                            }}
                                            style={{cursor:'pointer'}}
                                            >
                                        </RiUserUnfollowFill>
                                    </Cell>
                                    <Cell w={10}> <p>{dataFormat.fullDateBR(jovem.admissao)}</p></Cell>
                                    <Cell w={30}> <p>{jovem.nome}</p></Cell>
                                    <Cell w={25}> <p>{  jovem.nome_fantasia  }</p></Cell>
                                    <CellEtapa w={28}>
                                        <Link to={`/VerDadosCadastrais/${jovem.id_jovem}`}>
                                            <RiUserAddFill size={38} color={'#36C097'} />
                                        </Link>
                                        <Link to={`/CadastrarJovem_2/${jovem.id_jovem}`}>
                                            <FaCalendarCheck size={28} color={jovem.inclusao_calendario?'#36C097':'#fff'} />
                                        </Link>   

                                        {
                                            jovem.inclusao_pessoais?
                                            <Link
                                                to={'#'}
                                                onClick={event => event.preventDefault()}
                                                style={{ pointerEvents: 'none' }}>
                                                <GoChecklist size={38} color={'#278d6e'} />
                                            </Link> :
                                            <Link to={`/CadastrarJovem_3/${jovem.id_jovem}`}>
                                                 <GoChecklist size={38} color={'#fff'} />
                                            </Link>  
                                        }   
                                        <Link
                                            to={`/DetalheJovem/${jovem.id_jovem}`}>
                                            <FaArrowCircleRight size={36} color={'#fff'} />
                                        </Link> 
                                        
                                    </CellEtapa>
                                </Row>
                            )

                        })
                    }
                </TableContainer>:
                <div style={{display: 'flex',justifyContent: 'center'}}>
                    <img src={nada_aqui} alt="nada por aqui"/>
                </div>
                }
            </Container>
            { 
                isModalVisible?
                <ModalForm  
                    title={'Confirmar'}
                    service={JovemService.deletarAdmissao}
                    data={idDeleteJovem}
                    type={'default'}
                    >
                    <h2>Tem certeza que deseja exluir a admissão?</h2>
                </ModalForm> :
                false
            }
            
        </body>
    )
}

export default Admissoes;