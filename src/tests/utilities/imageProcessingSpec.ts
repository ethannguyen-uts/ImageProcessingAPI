import { randomInt } from 'crypto';
import { checkExistFile, resizeImage } from '../../utilities/imageProcessing';
import { promises as fsPromises } from 'fs';
import { constants } from 'fs';
import path from 'path';

describe('2. Testing Image Processing Function', () => {
  describe('2.1 Testing checkExistFile function', () => {
    it('should be true when an existed images is existed in ./assets/full folder', async () => {
      const fileName = 'fjord';
      const isExist = await checkExistFile(`./assets/full/${fileName}.jpg`);
      expect(isExist).toBeTrue();
    });
    it('should be false when check a image is not in ./assets/full folder', async () => {
      const fileName = 'abcxyz';
      const isExist = await checkExistFile(`./assets/full/${fileName}.jpg`);
      expect(isExist).toBeFalse();
    });
  });
  describe('2.2 Testing resize Image function', () => {
    const fileName = 'fjord';
    const inputWidth = randomInt(100, 500).toString();
    const inputHeight = randomInt(100, 500).toString();
    describe('Testing invalid input', () => {
      it('should throw error when fileName is not declared', async () => {
        await expectAsync(
          resizeImage('', inputWidth, inputHeight)
        ).toBeRejectedWith(
          new Error('Please indicate your file with fileName parameter!')
        );
      });
      it('should throw error when width is not an integer', async () => {
        await expectAsync(
          resizeImage(fileName, '123.44', inputHeight)
        ).toBeRejectedWith(new Error('Width and height must be integers!'));
      });
      it('should throw error when width is smaller than 0', async () => {
        await expectAsync(
          resizeImage(fileName, '-123', inputHeight)
        ).toBeRejectedWith(
          new Error('Width and height must be greater than 0!')
        );
      });
    });
    describe('Testing function', () => {
      it('should throw error when image does not exist is not declared', async () => {
        const invalidFileName = 'abcxyz';
        await expectAsync(
          resizeImage(invalidFileName, inputWidth, inputHeight)
        ).toBeRejectedWith(
          new Error(
            'File not found in directory, please select from these files: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica'
          )
        );
      });

      it('should get the correct output file path and created a file with width input and output height in thumb folder', async () => {
        const outputFilePath = await resizeImage(
          fileName,
          inputWidth,
          inputHeight
        );
        expect(outputFilePath).toEqual(
          path.resolve(
            `./assets/thumb/${fileName}_${inputWidth}_${inputHeight}.jpg`
          )
        );
        await expectAsync(
          fsPromises.access(outputFilePath, constants.F_OK)
        ).toBeResolved();
      });
    });
  });
});
