import React, { useEffect, useState } from 'react';
import { GiPlainCircle } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

function Footer() {
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const istOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      };

      const istHour = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).getHours();
      const formattedTime = now.toLocaleTimeString('en-IN', istOptions);
      setTime(formattedTime);

      
      if (istHour >= 10 && istHour <= 23) {
        setStatus(
          <span>
            👨🏻‍💻 Working <span className="green">&nbsp;<GiPlainCircle size={9} /></span>
          </span>
        );
      } else {
        setStatus(
          <span>
            💤 Dozing off... <span className="gray-text">&nbsp;<GiPlainCircle size={9} /></span>
          </span>
        );
      }
    };

    updateClock(); 
    const interval = setInterval(updateClock, 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='footer-container'>
      <div className="footer-content">
        <div>
          <p className='white-text'>
            Currently {status}
          </p>
          <Link to="/contact" className='gray-text hover2'>
            <p className='reach'>Reach out &rarr;</p>
          </Link>
        </div>
        <p className="gray-text ist-clock">{time}</p>
      </div>
      <p className='love gray-text'>
        Made with <span className='white-text'>&nbsp;<FaHeart size={12} />&nbsp;</span> by Aman
      </p>
    </div>
  );
}

export default Footer;
