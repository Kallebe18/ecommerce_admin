import {
  Button,
  Image,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import toast from "react-hot-toast";

type Product = {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: Number;
  stock: Number;
};

interface TableRowProps {
  product: Product;
  loadProducts: () => void;
}

export function TableRow({ product, loadProducts }: TableRowProps) {
  const { imageUrl, description, name, stock, price } = product;
  const textColor = useColorModeValue("gray.300", "white");
  const navigate = useNavigate();

  const handleEditProduct = () => {
    navigate("/products/edit", {
      state: {
        product,
      },
    });
  };

  const handleDeleteProduct = async () => {
    await api.delete("/products", {
      params: {
        id: product.id,
      },
    });
    await loadProducts();
    toast.success(`Produto ${product.name} deletado com sucesso!`);
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Image width={200} src={imageUrl} />
      </Td>

      <Td pl="0px">
        <Text fontSize="md" color={textColor} minWidth="100%">
          {name}
        </Text>
      </Td>

      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Text fontSize="md" color={textColor}>
          {description}
        </Text>
      </Td>

      <Td pl="0px">
        <Text fontSize="md" color={textColor}>
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </Td>

      <Td pl="0px">
        <Text fontSize="md" color={textColor}>
          {stock}
        </Text>
      </Td>

      <Td pr="0px">
        <Button p="0px" bg="transparent" variant="no-hover">
          <EditIcon
            onClick={handleEditProduct}
            w={8}
            h={8}
            color="yellow.500"
          />
        </Button>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover">
          <DeleteIcon
            onClick={handleDeleteProduct}
            w={8}
            h={8}
            color="red.500"
          />
        </Button>
      </Td>
    </Tr>
  );
}
