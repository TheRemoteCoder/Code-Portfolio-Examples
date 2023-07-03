import styled from 'styled-components';
import animations from '@config/styles/animations';

const cfg: any = {
  timing: animations.timing.default * 5,
  filter: {
    contrast: 1.35,
    saturation: 1.2,
  },
};

/**
 * Animation for any visual elements, like graphics, images or videos.
 */
const StyledFxColorPulsate = styled.div`
  @keyframes colorPulsate {
    0% {
      filter: contrast(1) saturate(1);
    }
    50% {
      filter: contrast(${cfg.filter.contrast}) saturate(${cfg.filter.saturation});
    }
    100% {
      filter: contrast(1) saturate(1);
    }
  }

  transition: filter ${animations.timing.default}s ${animations.easing.default};
  animation-name: colorPulsate;
  animation-duration: ${cfg.timing}s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-play-state: paused;
  animation-iteration-count: infinite;
  ${(props) => props.auto && `animation-play-state: running;`}
`;

export default StyledFxColorPulsate;
