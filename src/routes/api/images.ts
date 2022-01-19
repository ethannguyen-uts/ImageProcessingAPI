import express, { Router } from 'express';
import { resizeImage } from '../../utilities/imageProcessing';

const images: Router = express.Router();

images.get('/', async (req, res): Promise<void> => {
  //Process the images
  try {
    const imageResizedFilePath: string = await resizeImage(
      req.query.fileName as unknown as string,
      req.query.width as unknown as string,
      req.query.height as unknown as string
    );
    //Send file
    res.status(200).sendFile(imageResizedFilePath);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default images;
