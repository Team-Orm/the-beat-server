const Record = require("../../models/Record");
const BattleRoom = require("../../models/BattleRoom");
const Song = require("../../models/Song");

exports.saveRecord = async (req, res, next) => {
  const { uid, displayName, photoURL, totalScore, resultId } = req.body;

  console.log(uid, displayName, photoURL, totalScore, resultId);

  if (!uid || !displayName || !totalScore || !resultId) {
    return res.status(400).send({ message: "Invalid requested body" });
  }

  try {
    console.log(uid, displayName, photoURL, totalScore, resultId);

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
