import styled, { css } from 'styled-components';
import colors from '@config/styles/colors';
import getTransparentColor from '@helper/color-transparency';

const color: string = colors.theme.background; // "rgba(200, 100, 0, 0.2)"
const colorTrans: string = getTransparentColor(color, 0);

const cfg: any = {
  size: '4rem',
  sizeCenter: '2rem',
};

/**
 * Gradients to add between larger page sections.
 * Intended to overlap container edges and smoothly fade their images.
 *
 * Properties
 * - full   : Full screen width (independent of any container)
 * - top    : Add gradient above top of element
 * - bottom : Add gradient below end of element
 *
 * @todo WIP - Test: z-index needed?
 * @todo Optimize - Simplify styles (reduce variants)
 */
const StyledSectionGradient = styled.div`
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: ${cfg.size};
    z-index: 2;

    ${(props) =>
      props.full &&
      css`
        /* width: 98.319vw; */
        width: 100vw;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
      `}
  }

  ${(props) =>
    props.bottom &&
    `&::after { bottom: -${cfg.size}; background: linear-gradient(180deg, ${color} 0%, ${color} 50%, ${colorTrans} 100%); }`}

  ${(props) =>
    props.top && `&::before { top: -${cfg.size}; background: linear-gradient(0deg, ${color} 0%, ${color} 50%, ${colorTrans} 100%); }`}

  ${(props) =>
    props.centerBottom &&
    `&::after { bottom: -${cfg.sizeCenter}; background: linear-gradient(180deg, ${colorTrans} 0%, ${color} 30%, ${color} 50%, ${color} 70%, ${colorTrans} 100%); }`}

  ${(props) =>
    props.centerTop &&
    `&::before { top: -${cfg.sizeCenter}; background: linear-gradient(180deg, ${colorTrans} 0%, ${color} 30%, ${color} 50%, ${color} 70%, ${colorTrans} 100%); }`}
`;

export default StyledSectionGradient;
