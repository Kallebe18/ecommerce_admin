import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { ProductsTable } from "./ProductsTable";

interface Product {
  name: string;
  price: Number;
  description: string;
  imageUrl: string;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data }: AxiosResponse<Product[]> = await api.get("/products");
    setProducts(data);
  };

  const handleNavigateToCreateProduct = () => {
    navigate("create");
  };

  return (
    <Box p={10} style={{ minHeight: "100vh" }}>
      <Heading as="h4" color="gray.300">
        Produtos
      </Heading>
      <Flex justifyContent="flex-end">
        <Button onClick={handleNavigateToCreateProduct} mb={3}>
          Criar Produto
        </Button>
      </Flex>
      <ProductsTable loadProducts={loadProducts} data={products} />
    </Box>
  );
}
