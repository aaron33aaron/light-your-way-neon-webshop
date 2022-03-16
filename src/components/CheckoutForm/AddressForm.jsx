import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

// importing commerce as a named import
import { commerce } from '../../lib/lightyourway';
import FormInput from './CustomTextField';

const AddressForm = ( { checkoutToken, next }) => {
  // shipping countries set to array
  const [shippingCountries, setShippingCountries] = useState([]);
  // choseen country set to empty string
  const [shippingCountry, setShippingCountry] = useState('');
  // shipping subdivision set to array
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  // choosen subdivision set to empty string
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  // shipping options set to empty array
  const [shippingOptions, setShippingOptions] = useState([]);
  // choosen shipping option set to empty string
  const [shippingOption, setShippingOption] = useState('');

  const methods = useForm();

  // async function used to fetch shipping countries taking in a checkoutTokenId
  const fetchShippingCountries = async (checkoutTokenId) => {
    // API call to commerce.js is stored in countries 
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    // setting the shipping countries
    setShippingCountries(countries);
    // getting the keys of the countries in an arrray format and taking the first 
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };


  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);


  useEffect(() => {
    // if shipping country exist fetch the subdivisions
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]); //dependancy on shipping country

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]); //dependancy on shipping subdivision



  return (
    <>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {... methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
            <Grid container spacing={3}>
              <FormInput required name='firstName' label='First Name' />
              <FormInput required name='lastName' label='Last Name' />
              <FormInput required name='address1' label='Address' />
              <FormInput required name='email' label='Email' />
              <FormInput required name='city' label='City' />
              <FormInput required name='zip' label='ZIP / Postal Code' />
              <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </> 
  );
}

export default AddressForm