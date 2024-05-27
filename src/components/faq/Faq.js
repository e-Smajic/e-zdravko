import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    question: 'Šta ima?',
    answer: 'Evo nema ništa.'
  },
  {
    question: 'Đe si?',
    answer: 'Eo me.'
  },
  {
    question: 'Jesi dobar?',
    answer: 'A brate nisam al gura se.'
  },
  // Add more FAQs as needed
];

const FAQPage = () => {
  return (
    <Container maxWidth="md" style={{marginTop: '30px'}}>
      <Typography variant="h3" component="h1" gutterBottom>
        Najčešće postavljana pitanja
      </Typography>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQPage;
