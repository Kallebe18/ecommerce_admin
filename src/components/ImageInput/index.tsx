import { Flex, Image, Input, Text } from "@chakra-ui/react";
import { ImageInputContainer } from "./styles";
import { FiCamera } from "react-icons/fi";

interface ImageInputProps {
  currentImage: string;
  handleSelectImage(event: any): void;
}

export function ImageInput({
  currentImage,
  handleSelectImage,
}: ImageInputProps) {
  console.log(currentImage);
  return (
    <>
      <ImageInputContainer hasImage={!!currentImage}>
        <Flex
          h={"100%"}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {currentImage ? (
            <Image src={currentImage} boxSize="200px" objectFit="contain" />
          ) : (
            <>
              <FiCamera size={40} />
              <Text>Adicionar imagem</Text>
            </>
          )}
        </Flex>
        <label
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            top: 0,
            cursor: "pointer",
          }}
          htmlFor="file-input"
        />
        <Input
          name="file"
          display="none"
          position="absolute"
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleSelectImage}
        />
      </ImageInputContainer>
    </>
  );
}
