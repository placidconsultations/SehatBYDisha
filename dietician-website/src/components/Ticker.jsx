// components/Ticker.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Ticker = ({ items, duration = 50, reverse = false, cardComponent: Card, itemClassName = "px-1.5 sm:px-2 md:px-3" }) => {
  const animation = {
    x: reverse ? ['-100%', '0%'] : ['0%', '-100%'],
    transition: {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop'
    }
  };

  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden pb-4">
      <motion.div className="inline-flex items-stretch" animate={animation}>
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            /* We use itemClassName here to allow different gaps for different tickers */
            className={`${itemClassName} w-64 sm:w-72 md:w-80 lg:w-72 xl:w-80 flex-shrink-0`}
          >
            <Card {...item} index={index % items.length} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Ticker;