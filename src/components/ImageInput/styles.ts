import styled from "@emotion/styled";

interface ImageInputContainerProps {
  hasImage: boolean;
}

export const ImageInputContainer = styled.div<ImageInputContainerProps>`
  border-radius: 10px;
  border: 3px ${(props) => (props.hasImage ? "solid" : "dashed")} #999;
  height: 200px;
  width: 200px;
  position: relative;
  overflow: hidden;
`;
