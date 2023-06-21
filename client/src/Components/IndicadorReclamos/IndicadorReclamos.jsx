import React from "react";
import style from "./IndicadorReclamos.module.css";
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar'


function IndicadorReclamos() {
  
  return (
    
    <div className={style.body}>
    <NavBar />   
    <div className={style.container}>         
      <h2>Indicador de Reclamos</h2>  
      <div className={style.centerleft}></div>  
      <p></p>
    </div>
    <FooterBar/>
</div>
      
    
  );
}

export default IndicadorReclamos;
