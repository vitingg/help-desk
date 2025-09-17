import { Plus } from "lucide-react";
import { Button } from "../../../shared/components/button";
import { Table } from "../../../shared/components/table/table";
import { TableHeader } from "../../../shared/components/table/table-header";
import { TableRow } from "../../../shared/components/table/table-row";
import { TableHead } from "../../../shared/components/table/table-head";
import { TableBody } from "../../../shared/components/table/table-body";
import { TableCell } from "../../../shared/components/table/table-cell";
import { Icon } from "../../../shared/components/edit-icon";
import { StatusService } from "../../../shared/components/table/components/status-service";
import { useEffect, useState } from "react";
import { api } from "../../../shared/lib/api";
import { ChangeStatus } from "./components/change-status";
import { formattedPrice } from "../../../shared/utils/format-price";
import { useCreateServiceModal } from "./modals/create-service-modal";
import { type createCategorySchemaData } from "../../../shared/schemas/categories/create-categories";
import { createService } from "./api/create-service";
import { useEditServiceModal } from "./modals/edit-service-modal";
import { TableSkeleton } from "../../../shared/components/table/components/table-skeleton";

type GetAllCategories = {
  id: number;
  name: string;
  basePrice: number;
  isActive: boolean;
};

export function Service() {
  const [data, setData] = useState<GetAllCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchServices() {
      try {
        const response = await api.get("/categories", {
          signal: controller.signal,
        });
        setData(response.data.category);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();

    return () => {
      controller.abort();
    };
  }, []);

  async function refetchServices() {
    try {
      const response = await api.get("/categories");
      setData(response.data.category);
    } catch (error) {
      console.log("Falha ao buscar os serviços", error);
    }
  }

  useEffect(() => {
    refetchServices();
  }, []);

  async function handleUpdateStatus(id: number): Promise<void> {
    try {
      await api.put(`/categories/toggle/${id}`);
      await refetchServices();
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateService = async (formData: createCategorySchemaData) => {
    try {
      await createService(formData);
      await refetchServices();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditService = async (
    formData: createCategorySchemaData,
    id: number
  ) => {
    try {
      await api.put(`/categories/${id}`, formData);
      await refetchServices();
    } catch (error) {
      console.log(error);
    }
  };

  const { handleCreateModal } = useCreateServiceModal({
    onSubmit: handleCreateService,
  });

  const { handleEditModal } = useEditServiceModal({
    onSubmit: handleEditService,
  });

  return (
    <>
      <div className="flex pt-14 justify-between">
        <p className="text-blue-dark font-semibold text-xl">Serviços</p>
        <Button
          size={"lg"}
          className="flex items-center justify-center gap-2 "
          onClick={handleCreateModal}
        >
          <Plus />
          <span className="hidden md:table-cell">Novo</span>
        </Button>
      </div>
      <div className="pt-6">
        <Table className="table-auto w-full">
          <TableHeader>
            <TableRow isBody={false}>
              <TableHead>Título</TableHead>
              <TableHead hideOnMobile>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton
                rows={8}
                columns={[
                  { key: "title" },
                  { key: "value", hideOnMobile: true },
                  { key: "status" },
                  { key: "actions", type: "circle", width: 24, height: 24 },
                ]}
              />
            ) : (
              data?.map((data) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell className="font-bold">{data.name}</TableCell>
                    <TableCell hideOnMobile>
                      {formattedPrice(data.basePrice)}
                    </TableCell>
                    <TableCell>{StatusService(data.isActive)}</TableCell>
                    <TableCell className="w-full flex justify-end ">
                      <ChangeStatus
                        status={data.isActive}
                        id={data.id}
                        onChangeStatus={handleUpdateStatus}
                      />
                    </TableCell>
                    <TableCell>
                      <Icon
                        variant="edit"
                        onClick={() => handleEditModal(data.id)}
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
