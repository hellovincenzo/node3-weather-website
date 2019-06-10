const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/68e02122ed1c4c82f508728dc0caafeb/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the forecast API.", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const data = body.currently;
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          data.temperature
        }. There is ${data.precipProbability}% chance or rain.`
      );
    }
  });
};

module.exports = forecast;
