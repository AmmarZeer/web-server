const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e724d3e97efc68096c9824328778116d&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("something went wrong", undefined);
    } else if (body.error) {
      callback("something went wrong", undefined);
    } else {
      const { temperature, feelslike } = body.current;
      callback(
        undefined,
        `it's currently ${temperature} degrees, but it feels like ${feelslike} `
      );
    }
  });
};

module.exports = forecast;
