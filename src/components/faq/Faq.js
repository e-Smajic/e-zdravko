import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    question: 'Kako da napravim profil?',
    answer: 'Kliknite na registraciju i ispunite formular sa tačnim podacima. Nakon uspješne registracije ćete biti vraćeni na početnu stranicu i moći ćete se prijaviti sa svojim računom.'
  },
  {
    question: 'Šta trebam unijeti u kod za rolu?',
    answer: 'Ukoliko pravite obični profil kao pacijent, onda to polje ostavljate praznim. Ukoliko pravite neki drugi tip korisničkog profila, tu unosite kod koji ste dobili od administratora.'
  },
  {
    question: 'Koliko dugo se čeka na odgovor nakon rezervacije pregleda?',
    answer: 'Maksimalno 2 dana.'
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
