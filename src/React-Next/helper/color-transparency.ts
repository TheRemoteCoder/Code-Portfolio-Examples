/**
 * Get RGB(A) color with transparency.
 * Replaces last number found in string with transparency value.
 *
 * @param color RGBA color in format: 'rgba(0,0,0,1)'
 * @param transparency Float value from 0 to 1.
 * @return Transparency adjusted color
 */
const getTransparentColor = (color: string, transparency: number): string => {
  const regEx = /(\d)\)$/;

  return color.replace(regEx, `${transparency})`);
};

export default getTransparentColor;
