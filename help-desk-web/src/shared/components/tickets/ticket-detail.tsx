import { Paragraph } from "./components/paragraph";
import { CardBox } from "./components/card-box";
import { TicketLayout } from "./ticket-layout";
import { StatusTicket } from "../table/components/status-ticket";
import { getInitials } from "../../utils/get-initial-name";
import { formattedDate } from "../../utils/format-date";
import { formattedId } from "../../utils/format-id";
import Skeleton from "react-loading-skeleton";
import type { Ticket } from "../../types/tickets/ticket-response";

interface TicketDetailProps {
  data: Ticket;
}

export function TicketDetail({ data }: TicketDetailProps) {
  return (
    <TicketLayout className="w-lg md:min-w-md">
      <div className="flex justify-between items-center pb-5 gap-4">
        <CardBox className="">
          <Paragraph size="xs">{formattedId(data.id)}</Paragraph>
          <Paragraph size="md">{data.title}</Paragraph>
        </CardBox>
        {StatusTicket(data.status)}
      </div>
      <CardBox>
        <Paragraph size="xs">Descrição</Paragraph>
        <Paragraph size="sm">{data.description}</Paragraph>
      </CardBox>

      <CardBox>
        <Paragraph size="xs">Categoria</Paragraph>
        <Paragraph size="sm">
          <span>{data.categories[0].category.name}</span>
        </Paragraph>
      </CardBox>

      <CardBox className="flex">
        <div className="flex flex-col w-1/2">
          <Paragraph size="xs">Criado em</Paragraph>
          <Paragraph size="sm">{formattedDate(data.createdAt)}</Paragraph>
        </div>
        <div className="flex flex-col w-1/2">
          <Paragraph size="xs">Atualizado em</Paragraph>
          <Paragraph size="sm">{formattedDate(data.updatedAt)}</Paragraph>
        </div>
      </CardBox>

      <div className="">
        <Paragraph className="pb-2" size="xs">
          Cliente
        </Paragraph>
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 bg-blue-dark rounded-full text-2xs text-gray-600 flex justify-center items-center">
            {getInitials(data.client.username)}
          </div>
          <Paragraph size="sm">{data.client.username}</Paragraph>
        </div>
      </div>
    </TicketLayout>
  );
}

export function TicketDetailSkeleton() {
  return (
    <TicketLayout className="min-w-lg md:min-w-md">
      <div className="flex justify-between items-center pb-5">
        <CardBox className="">
          <Skeleton width={120} />
          <Skeleton width={120} />
        </CardBox>
        <Skeleton width={120} height={40} />
      </div>
      <CardBox>
        <Paragraph size="xs">Descrição</Paragraph>
        <Skeleton />
      </CardBox>

      <CardBox>
        <Paragraph size="xs">Categoria</Paragraph>
        <Skeleton />
      </CardBox>

      <CardBox className="flex">
        <div className="flex flex-col w-1/2">
          <Paragraph size="xs">Criado em</Paragraph>
          <Skeleton width={80} />
        </div>
        <div className="flex flex-col w-1/2">
          <Paragraph size="xs">Atualizado em</Paragraph>
          <Skeleton width={80} />
        </div>
      </CardBox>

      <div className="">
        <Skeleton width={80} />
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 bg-blue-dark rounded-full text-2xs text-gray-600 flex justify-center items-center">
            <Skeleton circle />
          </div>
          <Skeleton width={80} />
        </div>
      </div>
    </TicketLayout>
  );
}
