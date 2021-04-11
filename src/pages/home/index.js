

import React from "react";


import Header from '../../components/header';

import { Menu, LinkMenu } from './style'

import style from '../../globalStyle.css'



const Home = () => {
  return (



    <body style={style}>
      <Header />


      <Menu>
        <ul>
          <li><LinkMenu to='/CadastrarJovem'>Nova Admissão</LinkMenu></li>
          <li><LinkMenu to='/Admissoes'>Admissões</LinkMenu></li>
          <li><LinkMenu to='/ListarJovens'>Buscar Jovem</LinkMenu></li>
          <li><LinkMenu to='/CadastrarEmpresa'>Cadastrar Empresa</LinkMenu></li>
        </ul>
      </Menu>


    </body>





  )
}

export default Home;
