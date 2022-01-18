import express from 'express';
import { resizeImage } from '../../utilities/imageProcessing';

const images = express.Router();

images.get('/', async (req, res) => {
  //Process the images
  const query = req.query;
  const outputFileName = `${fileName}_${width.toString().trim()}_${height
    .toString()
    .trim()}.jpg`;
  const outputFilePath = `./assets/thumb/${outputFileName}`;
  try {
    const imageResizedFilePath = await resizeImage(
      query.fileName as unknown as string,
      query.width as unknown as string,
      query.height as unknown as string
    );
    //Send file
    res.sendFile(imageResizedFilePath);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default images;
