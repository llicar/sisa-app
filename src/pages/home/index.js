import React from "react";

import Header from '../../components/header';
import {Container} from './style'

import style from '../../globalStyle.css'

import homeIcon from "../../assets/images/home.png"

const Home = () => {
  return (
    <body style={style}>
      <Header />
      <Container>
        <img src={homeIcon} alt="Home"/>
      </Container>
    </body>

  )
}
export default Home;
