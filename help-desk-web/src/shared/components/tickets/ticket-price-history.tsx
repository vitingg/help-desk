import Skeleton from "react-loading-skeleton";
import { Paragraph } from "./components/paragraph";
import { TicketLayout } from "./ticket-layout";
import type { Ticket } from "../../types/tickets/ticket-response";
import { getInitials } from "../../utils/get-initial-name";
import { formattedPrice } from "../../utils/format-price";

interface TicketDetailProps {
  data: Ticket;
}

export function PriceHistory({ data }: TicketDetailProps) {
  return (
    <TicketLayout className="w-lg md:w-sm ">
      <div>
        <Paragraph size="xs" className="pb-2 pr-26">
          Técnico responsável
        </Paragraph>
        <div className="flex gap-2 items-center pb-8">
          <div className="w-8 h-8 bg-blue-dark rounded-full text-sm text-gray-600 flex justify-center items-center">
            {getInitials(data.tech ? data.tech.username : "Não definido")}
          </div>

          {data.tech ? (
            <div>
              <Paragraph size="sm">{data.tech.username}</Paragraph>
              <Paragraph size="sm">{data.tech.email}</Paragraph>
            </div>
          ) : (
            "Ainda não definido"
          )}
        </div>

        <div className="space-y-1.5">
          <Paragraph size="xs">Valores</Paragraph>
          <span className="flex justify-between items-center text-xs">
            <p>Preço base</p>
            <p>{formattedPrice(data.categories[0].category.basePrice)}</p>
          </span>
          <Paragraph size="xs">Adicionais</Paragraph>
          <span className="flex justify-between items-center text-xs">
            <div className="flex flex-col">
              {data.categories.map((item, index) => (
                <div key={index}>
                  {index === 0 ? null : <p>{item.category.name}</p>}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              {data.categories.map((item, index) => (
                <div key={index}>
                  {index === 0 ? null : formattedPrice(item.category.basePrice)}
                </div>
              ))}
            </div>
          </span>

          <div className="pb-2 border-0 border-b-1 border-b-gray-500" />
          <span className="flex justify-between items-center font-bold text-sm">
            <p>Total</p>
            {formattedPrice(
              data.categories.reduce(
                (acc, cat) => acc + (cat.category?.basePrice ?? 0),
                0
              )
            )}
          </span>
        </div>
      </div>
    </TicketLayout>
  );
}

export function PriceHistorySkeleton() {
  return (
    <TicketLayout className="min-w-sm">
      <div>
        <Paragraph size="xs" className="pb-2 pr-26">
          Técnico responsável
        </Paragraph>
        <div className="flex gap-2 items-center pb-8">
          <Skeleton circle width={40} height={40} />
          <div>
            <Skeleton width={120} />
            <Skeleton width={120} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Paragraph size="xs">Valores</Paragraph>
          <span className="flex justify-between items-center text-xs">
            <p>Preço base</p>
            <Skeleton width={120} />
          </span>
          <span className="flex justify-between items-center text-xs">
            <p>Adicionais</p>
            <Skeleton width={120} />
          </span>

          <div className="pb-2 border-0 border-b-1 border-b-gray-500" />
          <span className="flex justify-between items-center font-bold text-sm">
            <p>Total</p>
            <Skeleton width={120} />
          </span>
        </div>
      </div>
    </TicketLayout>
  );
}
