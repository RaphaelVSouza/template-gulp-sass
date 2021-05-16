import Jimp from 'jimp';
import fs from 'fs';

const images = fs.readdirSync('./src/img');

const outputPath = './src/img/optimized/';

const imageRegex = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

const imageSize = {
  height: 400,
  width: 400,
}

images.forEach((fileName) => {
  if(!imageRegex.test(fileName)) return;
    Jimp.read(`./src/img/${fileName}`)
      .then((image) => {
        image
        .cover(imageSize.width, imageSize.height)
        .write(`${outputPath}${fileName}`);
      })
      .catch((error) => {
        console.error(error);
    });
});



