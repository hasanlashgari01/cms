import { Ticket } from "@/types/ticket.types";

export type TicketListProps = {
  tickets: Ticket[];
};

export type MenuActions = {
  id: number;
};

export type MenuActionsProps = MenuActions;

export type TicketItemProps = Ticket;
