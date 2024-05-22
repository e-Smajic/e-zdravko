import React, { useState } from 'react';
import {
  Box, Container, TextField, Button, MenuItem, Grid, Typography, FormControl, InputLabel, Select,
  FormControlLabel, RadioGroup, Radio
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const theme = createTheme();

const Register = () => {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    datum_rodjenja: null,
    spol: '',
    broj_telefona: '',
    email: '',
    password: '',
    adresa_stanovanja: '',
    slika: null,
    rola_id: '',
    rola_kod: '',
    broj_knjizice: '',
    uid: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      slika: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{marginBottom: 2}}>
                    Registracija
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="ime"
                        variant="outlined"
                        required
                        fullWidth
                        label="Ime"
                        value={formData.ime}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="prezime"
                        variant="outlined"
                        required
                        fullWidth
                        label="Prezime"
                        value={formData.prezime}
                        onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    name="datum_rodjenja"
                                    label="Datum rođenja"
                                    type="date"
                                    required
                                    fullWidth
                                    value={formData.datum_rodjenja}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                name="broj_telefona"
                                variant="outlined"
                                required
                                fullWidth
                                label="Broj telefona"
                                value={formData.broj_telefona}
                                onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        
                    </Grid>

                    
                    <Grid item xs={12}>

                        <Grid container alignItems="center">
                            <Grid item xs={3}>
                                <Typography>Spol:</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <FormControl component="fieldset">
                                    <RadioGroup row name="spol" value={formData.spol} onChange={handleChange} required>
                                        <FormControlLabel value="male" control={<Radio />} label="Muško" />
                                        <FormControlLabel value="female" control={<Radio />} label="Žensko" />
                                        <FormControlLabel value="other" control={<Radio />} label="Ostalo" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                        name="email"
                        variant="outlined"
                        required
                        fullWidth
                        label="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name="password"
                        variant="outlined"
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        value={formData.password}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name="adresa_stanovanja"
                        variant="outlined"
                        required
                        fullWidth
                        label="Adresa stanovanja"
                        value={formData.adresa_stanovanja}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center">
                            <Grid item xs={3}>
                                <Typography>Slika profila:</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    >
                                    Uploaduj sliku
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleImageChange}
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="role-label">Rola</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            name="rola_id"
                                            required
                                            value={formData.rola_id}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="4">Pacijent</MenuItem>
                                            <MenuItem value="1">Doktor</MenuItem>
                                            <MenuItem value="2">Lab. tehničar</MenuItem>
                                            <MenuItem value="3">Apotekar</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                    name="rola_kod"
                                    variant="outlined"
                                    fullWidth
                                    label="Kod za rolu"
                                    value={formData.rola_kod}
                                    onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name="broj_knjizice"
                        variant="outlined"
                        fullWidth
                        label="Broj zdravstvene knjižice"
                        value={formData.broj_knjizice}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                        Registruj se
                        </Button>
                    </Grid>
                    </Grid>
                </form>
            </Box>    
        </Container>
    </ThemeProvider>
  );
};

export default Register;
