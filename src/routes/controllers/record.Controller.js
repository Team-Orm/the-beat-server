const Record = require("../../models/Record");
const BattleRoom = require("../../models/BattleRoom");
const Song = require("../../models/Song");

exports.getRecord = async (req, res, next) => {
  try {
    const record = await Record.find();

    res.status(200).send({ record });
  } catch (err) {
    next(err);
  }
};

exports.saveRecord = async (req, res, next) => {
  const { uid, displayName, photoURL, totalScore, resultId } = req.body;

  if (!uid || !displayName || !totalScore || !resultId) {
    return res.status(400).send({ message: "Invalid requested body" });
  }

  try {
    const room = await BattleRoom.findOne({ _id: resultId });

    const song = await Song.findOne({ _id: room.song });

    const record = await Record.create({
      uid,
      name: displayName,
      photoURL,
      title: song.title,
      totalScore,
    });

    res.status(201).send({ record });
  } catch (err) {
    next(err);
  }
};
