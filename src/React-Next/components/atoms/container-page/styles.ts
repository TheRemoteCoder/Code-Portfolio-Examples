import styled, { css } from 'styled-components';
import images from '@config/urls/images';

const imgPaths: any = images.backgrounds.images;
const imgOffsets: any = images.backgrounds.offsets;

type ImageVariantType = 'mobile' | 'desktop';

interface BackgroundConfigType {
  url: string;
  offset: string;
}

/**
 * Get background image and CSS offset for current image index.
 * Currently only JPG can be supported. Apply fallback data if nothing is found.
 *
 * @todo Optimize - Find way to implement Avif/Webp formats in the future
 * @todo Optimize - Implement 'image-set' in future: https://raoulkramer.de/avif-webp-images-css-background-usage-progressive-enhanced-with-image-set
 */
export const getBackgroundCfg = (isMobile: boolean, backgroundId?: number): BackgroundConfigType | null => {
  if (backgroundId === undefined) {
    return null;
  }

  const variant: ImageVariantType = isMobile ? 'mobile' : 'desktop';

  return {
    url: (imgPaths[variant] && imgPaths[variant][backgroundId] && imgPaths[variant][backgroundId].jpg) ?? '',
    offset: (imgOffsets[variant] && imgOffsets[variant][backgroundId]) ?? '50% 0',
  };
};

const StyledBackground = styled.div`
  ${(props) =>
    props.backgroundCfg &&
    css`
      background: url("` +
      props.backgroundCfg.url +
      `") no-repeat ` +
      props.backgroundCfg.offset +
      `;
      background-size: cover;
  `}
`;

export default StyledBackground;
