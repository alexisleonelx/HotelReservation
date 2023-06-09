import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import FooterBar from '../../FooterBar/FooterBar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './Suite Liucura/1.jpg'
import image2 from './Suite Liucura/2.jpg'
import image3 from './Suite Liucura/3.jpg'
import image4 from './Suite Liucura/4.jpg'
import image5 from './Suite Liucura/5.jpg'
import image6 from './Suite Liucura/6.jpg'
import style from './Habitacion3.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faMoneyBill, faPersonBooth  } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../../Paginate/Paginate';
import { set_Currents_Page } from '../../redux/action';
import { useEffect } from 'react';

const Habitacion1 = () => {
  
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const habitaciones = useSelector((state) => state.set_Current_Page); // Cambiar "state.set_Current_Page" por el nombre correcto
 
  const [currentPage, setCurrentPage] = useState(3);
  const habsPerPage = 1;
  const indexofLastRoom = currentPage * habsPerPage;
  const indexofFirstRoom = indexofLastRoom - habsPerPage;
  const visibleHabitaciones = habitaciones.slice(indexofFirstRoom, indexofLastRoom);

  const imagenes = useSelector(state => state.gethabitaciones[2].image);

  useEffect(() => {
    dispatch(set_Currents_Page(currentPage));
  }, [dispatch, currentPage]);


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={style.containertotal}>
      <NavBar></NavBar>
      <section >
      <h1 className={style.titulo}>Suite Licura</h1>
        <div className={style.texto}>
        
       
          <p>
          Con lindas vistas hacia el río, el bosque, y en medio<br></br> de un entorno natural único, nuestras habitaciones<br></br> destacan por su acogedor entorno, luminosidad <br></br>y decoración con cálidos materiales y elementos sureños.<br></br> Queremos que tengas la más cómoda y acogedora estadía.
          </p>
          </div>


          
          <div className={style.container}>
      <h2 className={style.title}>Características</h2>
      
  
    <div className={style.centerleft}>
    <div>
    <div className={style.image1}><FontAwesomeIcon icon={faBed}  /></div>
      
     
      
    </div>
      <p>
        Esta habitación posee cama matrimonial súper <br></br>
        King con la posibilidad de cama adicional, tina con<br></br>
         agua termal, vistas a bosque y con orilla de río, <br></br>
         caja de seguridad, minibar, aire acondicionado y <br></br>
         calefacción central termal, TV cable, batas, mesa de<br></br>
          desayuno, desayuno buffet y teléfono.
        </p>
    </div>
  
  
    <div className={style.centerrigth}>
    <div className={style.image2}>< FontAwesomeIcon icon={faPersonBooth} /></div>
      <p>Este tipo de habitación se encuentra disponible para <br></br>un máximo de dos personas..</p>
    </div>
  
  
    <div className={style.center}>
    <div className={style.image3}>< FontAwesomeIcon icon={faMoneyBill} /></div>
     
      <p>Revisa el detalle de los valores de esta habitación en <br></br>nuestra política de precios y estadía en nuestro<br></br> Centro de Ayuda.</p>
    </div>
    </div>
        
        </section>
      <div 
      className="container w-100">
        {imagenes.length && 
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {imagenes.map(imagen => {
            return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={imagen}
                alt="Slide"
                width="100%"
                height="750px"
              />
              <Carousel.Caption>
                {/* <h3>Second slide label</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              </Carousel.Caption> 
            </Carousel.Item> 
            )
          })}
        </Carousel>
        }
      </div>
      
        <div >
            <h2 className={style.caracteristicastitulo}>Incluye</h2>
            </div>
        <section className={style.caracteristicas}>
          
          
          <ul>
            <li>Caja de Seguridad</li>
            <li>Minibar</li>
            <li>Vista al bosque</li>
            <li>Aire Acondicionado</li>
            <li>Calefaccion central termal</li>
            <li>Batas</li>
            <li>Mesa de Desayuno</li>
          </ul>
        </section>


        <div className={style.titulodisponibilidad}><h2>Disponibilidad</h2></div>
        <section className={style.disponibilidad}>
          
          <p>Verifica la disponibilidad y realiza tu reserva en línea:</p>
        
        </section>
        <div className={style.containerlink}><a className={style.linka} href="#">Ver disponibilidad</a></div>
        <Paginado gamesPerPage={habsPerPage} habitaciones={habitaciones.length} paginado={setCurrentPage} currentPage={currentPage} />
        <FooterBar className={style.footer} />
      
      
    </div>
  );
};

export default Habitacion1;
