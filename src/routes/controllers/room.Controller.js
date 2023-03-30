const mongoose = require("mongoose");
const Song = require("../../models/Song");
const BattleRoom = require("../../models/BattleRoom");
const Note = require("../../models/Note");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET = process.env.AWS_BUCKET;
const PREFIX = "music/";
const params = {
  Bucket: BUCKET,
  Prefix: PREFIX,
};

exports.getRooms = async (req, res, next) => {
  if (!BattleRoom || !BattleRoom.schema.paths.song) {
    return res
      .status(500)
      .send({ message: "BattleRoom model or song field is missing" });
  }

  try {
    const rooms = await BattleRoom.find().populate("song");

    return res.send({ rooms });
  } catch (err) {
    next(err);
  }
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
    for (const key of Object.keys(audioURLs)) {
      if (audioURLs.hasOwnProperty(key)) {
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
    }

    const songs = await Song.find();

    res.status(200).send({ songs });
  } catch (err) {
    next(err);
  }
};

exports.makeRoom = async (req, res, next) => {
  const { song, createdBy, uid, mode } = req.body;

  if (!song || !createdBy || !uid) {
    return res.status(400).send({ message: "Invalid requested body" });
  }

  try {
    const room = await BattleRoom.create({
      song,
      createdBy,
      uid,
      mode,
    });

    res.status(201).send({ room });
  } catch (err) {
    next(err);
  }
};

exports.getBattleData = async (req, res, next) => {
  const { roomId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).send({ message: "Invalid URL" });
  }

  try {
    const room = await BattleRoom.findById({ _id: roomId });
    if (!room) {
      return res.status(404).send({ message: "Room not found" });
    }

    const song = await Song.findById({ _id: room.song });
    if (!song) {
      return res.status(404).send({ message: "Song not found" });
    }

    const note = await Note.findOne({ title: song.title });
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    res.send({ song, room, note });
  } catch (err) {
    next(err);
  }
};

exports.deleteBattleRoom = async (req, res, next) => {
  const { roomId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).send({ message: "Invalid URL" });
  }

  try {
    await BattleRoom.findByIdAndDelete({ _id: roomId });

    res.status(204).send({ result: "delete" });
  } catch (err) {
    next(err);
  }
};

exports.deleteForTest = async (req, res, next) => {
  const { email } = req.body;

  try {
    await BattleRoom.findByIdAndDelete({ uid: email });

    res.status(204).send({ result: "delete" });
  } catch (err) {
    next(err);
  }
};
