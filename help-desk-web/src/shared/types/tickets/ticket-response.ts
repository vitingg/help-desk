

type TicketStatus = "PENDING" | "IN_PROGRESS" | "COMPLETE";
interface Category {
  id: number;
  name: string;
  basePrice: number;
}
interface Client {
  id: number;
  username: string;
}
interface Tech {
  id: number;
  username: string;
  email: string;
}
interface ServiceCategory {
  categoryId: number;
  type: "BASE" | "ADDITIONAL";
  category: Category;
}
export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  client: Client;
  tech: Tech;
  categories: ServiceCategory[];
}

export interface createTicket {
  title: string;
  description: string;
  categories: number;
}


