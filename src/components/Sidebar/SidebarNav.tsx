import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

// icons
import { RiDraftLine, RiRssLine } from "react-icons/ri";

export function SidebarNav() {
	return (
		<Stack
			spacing="12"
			align="flex-start"
		>
			<NavSection title="GERAL">
				<NavLink href="/termos" icon={RiDraftLine} text="Termos" />
				<NavLink href="/feed" icon={RiRssLine} text="Feed de notícias" />
			</NavSection>
		</Stack>
	);
}
