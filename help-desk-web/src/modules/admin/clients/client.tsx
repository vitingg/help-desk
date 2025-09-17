import { TableSkeleton } from "../../../shared/components/table/components/table-skeleton";
import { TableHeader } from "../../../shared/components/table/table-header";
import { TableBody } from "../../../shared/components/table/table-body";
import { TableCell } from "../../../shared/components/table/table-cell";
import { TableHead } from "../../../shared/components/table/table-head";
import { TableRow } from "../../../shared/components/table/table-row";
import { getInitials } from "../../../shared/utils/get-initial-name";
import { Table } from "../../../shared/components/table/table";
import { Icon } from "../../../shared/components/edit-icon";
import { useDeleteCliente } from "./modals/delete-client";
import { useEditClient } from "./modals/edit-client";
import { api } from "../../../shared/lib/api";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";

type GetClientsType = {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
};

export function Clients() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleOpenDeleteModal } = useDeleteCliente({
    onDeleted: fetchClients,
  });
  const { handleOpenEditModal } = useEditClient({
    onEdited: fetchClients,
  });

  async function fetchClients() {
    try {
      const response = await api.get("/clients");
      setData(response.data.clients);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchClients() {
      try {
        const response = await api.get("/clients", {
          signal: controller.signal,
        });
        setData(response.data.clients);
        // console.log(response.data.clients);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    // console.log(data);
    fetchClients();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="flex pt-14 justify-start">
        <p className="text-blue-dark font-semibold text-xl">Clientes</p>
      </div>
      <div className="pt-6">
        <Table className="table-auto w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead hideOnMobile>Email</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton
                rows={5}
                columns={[
                  { key: "username" },
                  { key: "email", hideOnMobile: true },
                  { key: "actions", type: "circle", width: 24, height: 24 },
                ]}
              />
            ) : (
              data?.map((data: GetClientsType) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell
                      hasAbbreviation={
                        data?.profilePicture
                          ? data.profilePicture
                          : getInitials(data.username)
                      }
                    >
                      {data.username || <Skeleton />}
                    </TableCell>
                    <TableCell>{data.email || <Skeleton />}</TableCell>
                    <TableCell className="flex gap-2 items-center justify-end">
                      <Icon
                        variant="delete"
                        onClick={() =>
                          handleOpenDeleteModal(data.id, data.username)
                        }
                      />
                      <Icon
                        variant="edit"
                        onClick={() => handleOpenEditModal(data.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
