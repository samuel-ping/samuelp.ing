import { motion } from 'framer-motion';

export default function HamburgerButton({ isOpen }) {
  return (
    <motion.svg
      width="27"
      height="27"
      viewBox="-2 -4 27 27"
      fill="none"
      strokeWidth="2.5"
      stroke="#000000"
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.path
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
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </motion.svg>
  );
}
