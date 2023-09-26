import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function fDateTime(date: string) {
	return format(new Date(date.includes("Z") ? date : `${date}Z`), "dd/MM/yyyy p", { locale: ptBR });
}
