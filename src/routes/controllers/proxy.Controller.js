const axios = require("axios");

exports.getBuffer = async (req, res, next) => {
  const audioURL = req.query.url;

  if (!audioURL) {
    return res.status(400).send("Missing audio URL");
  }

  try {
    if (audioURL) {
      const response = await axios.get(audioURL, {
        responseType: "arraybuffer",
      });

      res.set("Content-Type", "audio/mpeg");
      res.send(response.data);
    }
  } catch (err) {
    next(err);
  }
};
