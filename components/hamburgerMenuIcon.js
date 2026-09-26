'use client';

import { motion } from 'framer-motion';

export default function HamburgerMenuIcon({ isOpen }) {
  return (
    <motion.svg
      className="stroke-black stroke-2 text-center dark:stroke-beige-100"
      width="35"
      height="35"
      viewBox="0 0 23 20"
      strokeLinecap="round"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.path
        d="M 2 2.5 L 20 2.5"
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <motion.path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <motion.path
        d="M 2 16.346 L 20 16.346"
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </motion.svg>
  );
}
