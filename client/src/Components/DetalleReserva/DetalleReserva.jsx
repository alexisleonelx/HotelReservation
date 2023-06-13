import React ,  { useEffect, useState }from 'react';
import style from './DetalleReserva.module.css';
import { Link } from 'react-router-dom';
import {getReservaByUsuario } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
function DetalleReserva() {
  const usuario = useSelector(state => state.usuario);
  console.log("usuario");
  console.log(usuario);
  const dispatch = useDispatch();
  let reserva = useSelector((state) => state.reserva);
  
  useEffect(() => { 
    if (usuario)    
        dispatch(getReservaByUsuario(usuario));
  }, [dispatch])
  
  const handleClose = () => {
    // Acciones a realizar al hacer clic en el botón de cerrar
    console.log('Cerrar');
  };
  const handlePayment = async () => {
    const localData = window.localStorage.getItem("client");
    const localReservation = window.localStorage.getItem("dataReservation");
    let paquetesAgain=[]
    if (localData&&localReservation) {
      const data = JSON.parse(localData);
      const datares = JSON.parse(localReservation);
      console.log(datares.arrPaquete);
      // if() 
      //   for (const paquete of reserva) {
      //   paquetesAgain.push(paquete.paquete);
      // }
      
      
      
      //const dataRes = JSON.parse(localReservation);
      //console.log(paquetesAgain);
      //console.log(dataRes.a);
      //console.log(reserva);
      try {

        const response = await axios.post("http://localhost:3001/payment/checkout", {
          custumerId: data,
          arrIdHabitaciones: datares.arrHabitacion,
          arrIdPaquetes:datares.arrPaquete
        });
        
        const { payment } = response.data;
        window.location.href = payment;
      } catch (error) {
        console.error(error);
      }
     }
  };
  
  const renderDetalleReserva = () => {   
    if (Array.isArray(reserva)) {      
      return reserva.map((re) => {       
        return (         
        <div > 
          <div className={style.encierro}>
              <h1 className={style.tit}>SU RESERVA</h1>
              <h2 className={style.mail} >{re.usuario}</h2>  
              <p className={style.label}>Fecha de entrada:</p>
              <p className={style.label2}>{re.fechaInicio.substring(0,10)}</p>
              <p className={style.label}>Fecha de salida:</p>
              <p className={style.label2}>{re.fechaFin.substring(0,10)}</p>
              
              <p className={style.label}>Precio:</p>
              <p className={style.label2}>${re.costo}</p>    
              <button onClick={handlePayment} className={style.buttonpago} >Realizar Pago</button>
          </div>
        </div>
        );
      });
    
  }
  };

  return (
    <div className={style.container}>
      <div >
        <Link className={style.linkContainer} to="/">
          <button className={style.botoncerrar} onClick={handleClose}>
            X
          </button>
        </Link>        
       
        <div >{renderDetalleReserva()}</div>
        
      </div>
    </div>
  );
}

export default DetalleReserva;
