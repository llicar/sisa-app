

import React from "react";


import Header from '../../components/header';

import { Menu, LinkMenu} from './style'

import style from '../../globalStyle.css'

import { RiUserAddFill } from "react-icons/ri";
import { FaThList } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
import { IoBusiness } from "react-icons/io5";


const Home = () => {
  return (



    <body style={style}>
      <Header />

      <Menu>
        <ul>
          <li><LinkMenu to='/CadastrarJovem'>Nova Admissão <RiUserAddFill/> </LinkMenu> </li>
          <li><LinkMenu to='/Admissoes'>Admissões <FaThList/></LinkMenu></li>
          <li><LinkMenu to='/ListarJovens'>Aprendizes <RiUserSearchFill/></LinkMenu></li>
          <li><LinkMenu to='/CadastrarEmpresa'>Empresas <IoBusiness/></LinkMenu></li>
        </ul>
      </Menu>

    </body>





  )
}

export default Home;
