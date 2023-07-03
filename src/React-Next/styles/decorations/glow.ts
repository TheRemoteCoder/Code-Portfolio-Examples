import styled, { css } from 'styled-components';
import colors from '@config/styles/colors';

const color = colors.ui.global.detail.light;
const cfg: any = {
  size: '0.25rem',
};

const styles = `filter: drop-shadow(0 ${cfg.size} ${cfg.size} ${color});`;

const StyledDecorationGlow = styled.div`
  ${styles}
`;

export default StyledDecorationGlow;
