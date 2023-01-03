// Unused because converting takes too long. Using a solid pixel color instead of blurhash.
import { decode } from 'blurhash';
import sharp from 'sharp';

export default async function BlurHashToBase64(blurhash) {
  const width = 160;
  const height = 120;

  const pixelArray = decode(blurhash, width, height, 1);

  const data = await sharp(pixelArray, {
    raw: {
      width: width,
      height: height,
      channels: 4,
    },
  })
    .resize({ width: 160 })
    .toBuffer({ resolveWithObject: true });

  return data;
}
