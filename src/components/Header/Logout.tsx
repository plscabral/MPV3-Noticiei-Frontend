import { IconButton, Tooltip } from "@chakra-ui/react";

// hooks
import { useAuth } from "../../hooks/useAuth";

// icons
import { MdLogout } from "react-icons/md";

export function Logout() {
	const { handleLogout } = useAuth();

	return (
		<Tooltip hasArrow label='Fazer logout' >
			<IconButton
				ml={10}
				variant="unstyled"
				color={"cyan.500"}
				transition="filter(0.2)"
				_hover={{
					filter: "brightness(0.9)"
				}}
				aria-label='Sair'
				icon={<MdLogout fontSize={24} color={"red.400"} />}
				onClick={handleLogout}
			/>
		</Tooltip>
	);
}
