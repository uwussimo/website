import sharp from "sharp";

const MAX_SIDE = 1600;

/**
 * Normalises an uploaded image for storage: rotated upright, at most 1600px
 * on its long side, webp.
 */
export async function toStoredImage(input: Buffer | Uint8Array) {
  const { data, info } = await sharp(input)
    .rotate()
    .resize(MAX_SIDE, MAX_SIDE, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer({ resolveWithObject: true });

  return {
    data: new Uint8Array(data),
    mimeType: "image/webp",
    width: info.width,
    height: info.height,
  };
}
