import React from 'react';
import '../styles/Growth.css';
import GrowthGraph from '../assets/graph.png';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'We excel at implementation',
    description: 'Your success is our priority. We design strategic plans to help you achieve maximum results, efficiently and effectively.',
  },
  {
    title: 'Expert team',
    description: 'Experience the difference. Our team\'s knowledge drives your success with their remarkable marketing campaign skills.',
  },
  {
    title: 'Effective execution models',
    description: 'Designed for immediate traction and sustained growth. Performance-driven creative that turns risk into results.',
  },
  {
    title: 'Algorithmically Optimized Approach',
    description: 'We make growth predictable by leveraging data to find high-potential audiences and scale your campaigns seamlessly.',
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: custom * 0.15 }
  })
};


const GrowthFramework = () => {
  return (
    <section className="growth-section" id="approach">
      <img src={GrowthGraph} alt="Growth Graph" className="growth-svg-bg" />

      <motion.div
        className="growth-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 className="growth-heading" variants={fadeUp} custom={0}>
          Upscale your business with our <br />
          <span>credible growth framework</span>
        </motion.h2>

        <motion.p className="growth-subtext" variants={fadeUp} custom={1}>
          Our tested and validated system has helped many clients generate over $100 thousand in revenue.
          Regardless if you’re about to implement on your vision or an established entity,
          we’ll help you emerge your work into a profitable concern.
        </motion.p>

        <div className="growth-cards">
          {features.map((feature, idx) => (
            <motion.div
              className="growth-card"
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={idx + 2}
            >
              <div className="align">
                <span className="red"></span>
                <span className="yellow"></span>
                <span className="green"></span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GrowthFramework;
