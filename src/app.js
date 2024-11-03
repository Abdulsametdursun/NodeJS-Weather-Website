const path = require('path');
const express = require('express');
const hbs = require('hbs');

//* map - weather import
const mapUrl = require('./utils/map');
const weatherUrl = require('./utils/weather');

const app = express();

//* Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//* Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//* Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Sam Dursun',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Sam Dursun',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'Help is on the way please be patient !!!',
    name: 'Sam Dursun',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a place for the search term',
    });
  }

  mapUrl(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: 'Error with map service: ' + error });
    }

    weatherUrl(latitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send({ error: 'Error with weather service: ' + error });
      }
      res.send({
        forecast: weatherData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('help', {
    title: 'THIS HELP ARTICLE IS NOT FOUND!!!',
    message: 'This help page is not exist, please go to Help page',
    name: 'Sam Dursun',
  });
});

//* if there are no more any page, show it:
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: '404 Page is not FOUND!!!',
  });
});

app.listen(3000, () => {
  console.log('Server is listing...');
});
