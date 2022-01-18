import { promises as fsPromises } from 'fs';
import { constants } from 'fs';
import sharp from 'sharp';
import path from 'path';

const checkExistFile = async (filePath: string) => {
  try {
    await fsPromises.access(filePath, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

const resizeImage = async (
  fileName: string,
  inputWidth: string,
  inputHeight: string
) => {
  const width = Number(inputWidth);
  const height = Number(inputHeight);
  //const a = inputWidth as unknown as number;

  //Checking input parameter
  if (fileName === undefined || fileName === '') {
    throw new Error('Please indicate your file with fileName parameter!');
  }
  if (inputWidth === undefined || inputHeight === undefined) {
    throw new Error('Please include width and height in your query!');
  }
  if (!(Number.isInteger(width) && Number.isInteger(height))) {
    throw new Error('Width and height must be integers!');
  }
  if (width < 0 || height < 0) {
    throw new Error('Width and height must be greater than 0!');
  }

  //determine filePath
  const filePath = `./assets/full/${fileName}.jpg`;
  const outputFileName = `${fileName}_${width.toString().trim()}_${height
    .toString()
    .trim()}.jpg`;
  const outputFilePath = `./assets/thumb/${outputFileName}`;

  //Step 1: Check exists original file in directory, if not exist throw new error
  const existOriginalFile = await checkExistFile(filePath);
  if (!existOriginalFile)
    throw new Error(
      'File not found in directory, please select from these files: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica'
    );
  //Step 2: Check if the resized image existed and resize the image if it does not exsist
  const existProcessedImage = await checkExistFile(outputFilePath);
  if (!existProcessedImage) {
    //if not exist, resize image and put the image in thumb folder
    const buffer = await sharp(filePath).resize(width, height).toBuffer();
    await fsPromises.writeFile(outputFilePath, buffer);
  }
  //Step 3: Serve the processed file in thumb folder
  return path.resolve(outputFilePath);
};

export { resizeImage, checkExistFile };
