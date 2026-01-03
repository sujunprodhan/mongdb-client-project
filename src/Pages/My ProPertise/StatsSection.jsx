import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const stats = [
    { end: 500, label: 'Happy Clients', suffix: '+' },
    { end: 1200, label: 'Properties Listed', suffix: '+' },
    { end: 98, label: 'Satisfaction Rate', suffix: '%' },
    { end: 15, label: 'Years Experience', suffix: '+' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-center mb-16"
        >
          Our Achievements
        </motion.h2>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="text-center"
            >
              <motion.h3
                className="text-5xl md:text-6xl font-black text-pink-600"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
              >
                <CountUp end={stat.end} duration={2.5} suffix={stat.suffix} />
              </motion.h3>
              <p className="text-xl text-gray-600 mt-4">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const CountUp = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};
