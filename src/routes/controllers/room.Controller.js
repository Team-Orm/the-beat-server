const Song = require("../../models/Song");
const BattleRoom = require("../../models/BattleRoom");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET = process.env.AWS_BUCKET;
const PREFIX = "music/";
const params = {
  Bucket: BUCKET,
  Prefix: PREFIX,
};

exports.getSongs = async (req, res, next) => {
  const s3Objects = await s3.listObjects(params).promise();

  const audioURLs = {};
  let song;

  s3Objects.Contents.forEach((obj) => {
    const [folder, file] = obj.Key.replace(PREFIX, "").split("/");
    const title = folder.slice(0, folder.indexOf("-"));

    if (!audioURLs[folder]) {
      audioURLs[folder] = { title };
    }

    if (file.includes(".mp3")) {
      audioURLs[
        folder
      ].audioURL = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`;
    }

    if (file.includes(".jpg")) {
      audioURLs[
        folder
      ].imageURL = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`;
    }
  });

  try {
    // eslint-disable-next-line guard-for-in
    for (const key in audioURLs) {
      song = await Song.find({ title: audioURLs[key].title });

      if (!song.length) {
        await Song.create({
          title: audioURLs[key].title,
          imageURL: audioURLs[key].imageURL,
          audioURL: audioURLs[key].audioURL,
          artist: key.slice(key.lastIndexOf("-") + 1),
        });
      }
    }

    const songs = await Song.find();

    res.status(200).send({ result: "ok", songs });
  } catch (err) {
    next(err);
  }
};

exports.makeRoom = async (req, res, next) => {
  const { song, createdBy, email } = req.body;

  try {
    const room = await BattleRoom.create({
      song,
      createdBy,
      email,
    });

    res.send({ result: "ok", room });
  } catch (err) {
    next(err);
  }
};

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await BattleRoom.find();
    res.status(200).send({ rooms });
  } catch (err) {
    next(err);
  }
};

exports.getBattleData = async (req, res, next) => {
  const { roomId } = req.params;

  try {
    const room = await BattleRoom.findById({ _id: roomId });
    const song = await Song.findById({ _id: room.song });

    res.send({ song, room });
  } catch (err) {
    next(err);
  }
};
