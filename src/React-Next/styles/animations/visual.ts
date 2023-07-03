import styled from 'styled-components';
import animations from '@config/styles/animations';

const cfg: any = {
  contrast: 1.05,
  saturation: 1.2,
};

/**
 * Hover animation for interactive visual elements; e.g. graphics, images or videos.
 */
const StyledAnimatedVisual = styled.div`
  transition: filter ${animations.timing.default}s ${animations.easing.default};

  &:hover {
    filter: contrast(${cfg.contrast}) saturate(${cfg.saturation});
  }
`;

export default StyledAnimatedVisual;
