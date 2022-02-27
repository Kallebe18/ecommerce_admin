import {
  Box,
  Flex,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  Button,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";

import { api } from "../../../services/api";
import { ImageInput } from "../../../components/ImageInput";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  file: FileList;
}

export function ProductForm() {
  const { state } = useLocation() as any;
  const [image, setImage] = useState<any>({
    uri: "",
    file: null,
  });
  const { register, handleSubmit, control, reset } = useForm<ProductFormData>({
    defaultValues: {
      price: 0,
      stock: 0,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const product: ProductFormData = state?.product;
    reset(product);
  }, [state]);

  const handleForm = async (product: ProductFormData) => {
    if (!state?.product) {
      const id = await createProduct(product);
      await saveProductImage(id);
    } else {
      const id = await saveProduct(product);
      await saveProductImage(id);
    }
    navigate("/products");
    toast.success("Produto salvo com sucesso!");
  };

  const createProduct = async (product: ProductFormData) => {
    const { data } = await api.post("/products/create", product);
    return data.id;
  };

  const saveProduct = async (product: ProductFormData) => {
    const { data } = await api.patch("/products/edit", product, {
      params: {
        id: state?.product?.id,
      },
    });
    return data.id;
  };

  const saveProductImage = async (id: string) => {
    if (!image?.file) return;
    const formData = new FormData();
    formData.append("file", image.file);
    await api.post("/products/upload/image?id=" + id, formData);
  };

  const handleCancelEdit = () => {
    navigate(-1);
  };

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = URL.createObjectURL(event.target.files[0]);
      setImage({
        ...image,
        uri: selectedImage,
        file: event.target.files[0],
      });
    }
  };

  return (
    <Box p={10} style={{ minHeight: "100vh" }}>
      <Heading mb={5} as="h4">
        {!!state?.product?.id ? "Editar produto" : "Novo produto"}
      </Heading>
      <form onSubmit={handleSubmit(handleForm)}>
        <Input mb={5} placeholder="Nome" {...register("name")} />
        <Textarea placeholder="Descrição" mb={5} {...register("description")} />

        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, ...field } }) => (
            <NumberFormat
              {...field}
              onValueChange={(values) => onChange(values.floatValue)}
              thousandSeparator={true}
              decimalScale={2}
              prefix={"$"}
              placeholder="Preço"
              mb={5}
              customInput={Input}
            />
          )}
        />

        <Controller
          control={control}
          name="stock"
          render={({ field: { onChange, ...field } }) => (
            <NumberInput
              {...field}
              keepWithinRange={true}
              onChange={(_, number) => onChange(number)}
              mb={5}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />

        <ImageInput
          currentImage={!!image?.uri ? image?.uri : state?.product?.imageUrl}
          handleSelectImage={handleSelectImage}
        />

        <Flex justifyContent="flex-end">
          <Button onClick={handleCancelEdit} mt={5} mr={3}>
            Cancelar
          </Button>
          <Button type="submit" mt={5}>
            Salvar
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
