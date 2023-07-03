import styled, { css } from 'styled-components';
import animations from '@config/styles/animations';

const styles = `
  transition: color ${animations.timing.fast}s ${animations.easing.default};
`;

const StyledAnimatedLink = styled.a`
  ${styles}
`;

export const StyledAnimatedLinkMixin = css`
  ${styles}
`;

export default StyledAnimatedLink;
