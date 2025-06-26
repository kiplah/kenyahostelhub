import { motion } from "framer-motion";

export default function FadeInSection({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'none'
  distance = 30,
  once = true,
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
