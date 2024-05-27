import React from 'react';
import { Container, Typography, Card, CardMedia, CardContent } from '@mui/material';
import news_img1 from './img/health_policy.jpg';

const NewsArticle = () => {
  return (
    <Container maxWidth="md" style={{marginTop: '30px'}}>
      <Card>
        {news_img1 && (
          <CardMedia
            component="img"
            image={news_img1}
            alt={"title"}
            title={"Naslov članka"}
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Naslov članka
          </Typography>
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus convallis imperdiet cursus. 
            Nullam malesuada faucibus velit, sit amet congue purus venenatis vitae. 
            Ut quis finibus purus, in vulputate velit. Sed congue eleifend tortor, non ornare lacus convallis tristique. 
            Aliquam ac dui a tortor cursus aliquet. Etiam finibus est nec erat eleifend elementum. 
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewsArticle;