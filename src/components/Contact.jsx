import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactSection = styled.section`
  min-height: 100vh;
  background: #0a192f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:0rem 2rem;
`;

const Container = styled.div`
  max-width: 450px;
  width: 100%;
  margin:0;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #ccd6f6;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: rgba(17, 34, 64, 0.4);
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.2);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #8892b0;
  font-size: 0.85rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 92%;
  padding:0.7rem;
  background: rgba(17, 34, 64, 0.6);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 6px;
  color: #ccd6f6;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #64ffda;
    background: rgba(17, 34, 64, 0.8);
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  padding: 0.7rem 1rem;
  background: rgba(17, 34, 64, 0.6);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 6px;
  color: #ccd6f6;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #64ffda;
    background: rgba(17, 34, 64, 0.8);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 0.7rem 1.5rem;
  background: transparent;
  border: 1px solid #64ffda;
  border-radius: 6px;
  color: #64ffda;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 8px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: rgba(100, 255, 218, 0.1);
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 16px;
  height: 16px;
  border: 2px solid #64ffda;
  border-top: 2px solid transparent;
  border-radius: 50%;
`;

const StatusMessage = styled(motion.div)`
  padding: 0.7rem;
  border-radius: 6px;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  background: ${props => props.type === 'success' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 100, 100, 0.1)'};
  color: ${props => props.type === 'success' ? '#64ffda' : '#ff6464'};
`;

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        'service_hhsedcq',
        'template_qgrnp5v',
        form.current,
        'YEWZQIc6iZ0v2t2Bu'
      );
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      form.current.reset();
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </Title>
        <Form ref={form} onSubmit={handleSubmit}>
          <InputGroup>
            <Label>from_name</Label>
            <Input
              type="text"
              name="from_name"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>to_name</Label>
            <Input
              type="text"
              name="to_name"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>message</Label>
            <TextArea
              name="message"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>reply_to</Label>
            <Input
              type="email"
              name="reply_to"
              required
            />
          </InputGroup>
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </SubmitButton>
          {status && (
            <StatusMessage
              type={status.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {status.message}
            </StatusMessage>
          )}
        </Form>
      </Container>
    </ContactSection>
  );
};

export default Contact;
