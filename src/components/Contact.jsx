import React from 'react';
import '../styles/Contact.css';
import { motion } from 'framer-motion';
import ContactCanvasBackground from './ContactCanvasBackground';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <ContactCanvasBackground />

      <div className="contact-wrapper">
        <motion.div
          className="contact-text"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2>Let’s Work Together</h2>
          <p>Drop us a message and we’ll get back to you ASAP. We’re here to level up your digital presence.</p>
        </motion.div>

        <motion.form
          className="contact-form"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="form-group">
            <input type="text" required placeholder=" " />
            <label>Name</label>
          </div>
          <div className="form-group">
            <input type="email" required placeholder=" " />
            <label>Email</label>
          </div>
            <div className="form-group">
            <input type="text" required placeholder=" " />
            <label>Social account url</label>
          </div>
          <div className="form-group">
            <textarea rows="4" required placeholder=" "></textarea>
            <label>Message</label>
          </div>
          <motion.button
            type="submit"
            className="send-btn"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
