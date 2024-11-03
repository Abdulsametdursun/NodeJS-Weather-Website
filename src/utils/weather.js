const request = require('request');

const weatherUrl = (latitude, longitude, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=90447a25e517a08a887c35a63849a798&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          `. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = weatherUrl;
