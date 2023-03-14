// const Song = require("../../models/Song");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.AWS_BUCKET;

exports.getSongs = async (req, res, next) => {
  const params = {
    Bucket: BUCKET_NAME,
    Prefix: "music/",
  };

  const s3Objects = await s3.listObjects(params).promise();
  const audioURLs = s3Objects.Contents.map(
    (obj) =>
      `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`,
  );

  console.log(audioURLs, "123");

  try {
    // let song = await Song.findOne({ email });

    // if (!song) {
    //   song = await Song.create({
    //     title,
    //     artist,
    //     audioURL,
    //   });
    // }
    // const songs = await Song.find();

    res.status(200).send({ result: "ok" });
  } catch (err) {
    next(err);
  }
};
