// Updated Contact.jsx

import React, { useState} from 'react';
import '../styles/Contact.css';
import { motion, AnimatePresence } from 'framer-motion';
import ContactCanvasBackground from './ContactCanvasBackground';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    social: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateURL = (url) => /^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/.test(url);
  const wordCount = (text) => text.trim().split(/\s+/).length;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validateURL(formData.social)) {
      setError('Please enter a valid URL (e.g. https://example.com)');
      return;
    }

    if (wordCount(formData.message) > 200) {
      setError('Message should not exceed 200 words.');
      return;
    }

    setLoading(true);
    setSubmitted(false);

    try {
      await axios.post('https://nexus-backtesting.onrender.com/api/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', social: '', message: '' });

      setTimeout(() => setSubmitted(false), 2000); // hide after 2 sec
    } catch (err) {
      setError('Something went wrong. Please try again!');
    }

    setLoading(false);
  };

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
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="form-group">
            <input type="text" name="name" required placeholder=" " value={formData.name} onChange={handleChange} />
            <label>Name</label>
          </div>

          <div className="form-group">
            <input type="email" name="email" required placeholder=" " value={formData.email} onChange={handleChange} />
            <label>Email</label>
          </div>

          <div className="form-group">
            <input type="text" name="social" required placeholder=" " value={formData.social} onChange={handleChange} />
            <label>Social account url</label>
          </div>

          <div className="form-group">
            <textarea name="message" rows="4" required placeholder=" " value={formData.message} onChange={handleChange}></textarea>
            <label>Message</label>
          </div>

          {error && <p className="error-text">{error}</p>}

          <motion.button
            type="submit"
            className="send-btn"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>

          <AnimatePresence>
            {submitted && (
              <motion.div
                className="success-toast"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5 }}
              >
                ✅ Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
