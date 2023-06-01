import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import style from "./FooterBar.module.css";
import imagen from './logo hotel2.png';

const handleInstagramClick = () => {
  window.open('https://www.instagram.com/hoteleternotermal/', '_blank');
}
  const handleTwitterClick = () => {
  window.open('https://twitter.com/Hoteltereterno', '_blank');
}
const handleFacebookClick = () => {
  window.open('https://www.facebook.com/profile.php?id=100093402330219', '_blank');
}

function FooterBar() {
  return (
    <div className={style.footerBar}>
      <div className={style.logo}>
        <img src={imagen} alt="Logo" />
      </div>
      <div className={style.linkawesome}>
        <a href="#" onClick={handleFacebookClick}><FontAwesomeIcon icon={faFacebookF} /></a>
        <a href="#" onClick={handleInstagramClick}><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="#" onClick={handleTwitterClick}><FontAwesomeIcon icon={faTwitter} /></a>
      </div>
      <p className={style.footerText}>&copy; 2023 Hotel Eterno. Todos los derechos reservados.</p>
    </div>
  );
}

export default FooterBar;