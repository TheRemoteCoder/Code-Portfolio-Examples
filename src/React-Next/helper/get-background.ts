import styled from 'styled-components';
import ContainerPage from '@components/atoms/container-page';
import BackgroundType from '@type/background';

/**
 * Generate background image container.
 */
const getBackground = (index: number): BackgroundType => {
  const StyledContainer = styled(ContainerPage).attrs((_props: any) => ({
    backgroundId: index,
  }))``;

  const data: BackgroundType = {
    Container: StyledContainer,
    index,
  };

  return data;
};

export default getBackground;
