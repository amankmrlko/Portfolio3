import React from 'react'
import Heading from './Heading'
import { GiCampCookingPot } from "react-icons/gi";
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function Thoughts() {
  return (
    <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
      <Heading 
      title="Coming Soon! 🚧" 
      subtitle="Hold up! Something awesome is cooking up."/>
      <div className='cooked gray-text'><GiCampCookingPot  size={250}/></div>
    </motion.div>
  )
}

export default Thoughts