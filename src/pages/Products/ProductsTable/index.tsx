import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { TableRow } from "../TableRow";

interface TableProps {
  data: any;
  loadProducts: () => void;
}

export function ProductsTable({ data, loadProducts }: TableProps) {
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr my=".8rem" pl="0px">
            <Th></Th>
            <Th pl="0px">Nome</Th>
            <Th pl={"0px"}>Descrição</Th>
            <Th pl={"0px"}>Preço</Th>
            <Th pl={"0px"}>Estoque</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row: any) => {
            return (
              <TableRow
                loadProducts={loadProducts}
                key={row.id}
                product={row}
              />
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}
