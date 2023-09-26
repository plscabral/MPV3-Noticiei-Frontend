// @chakra ui
import { Flex } from "@chakra-ui/react";

// components
import { Logo } from "../Logo";
import { Profile } from "./Profile";
import { Logout } from "./Logout";

export function Header() {
	return (
		<Flex
			as="header"
			w="100%"
			maxW={1480}
			h="20"
			mx="auto"
			mt="4"
			align="center"
			px="6"
		>
			<Logo />

			<Flex
				align="center"
				ml="auto"
			>
				<Profile />
				<Logout />
			</Flex>
		</Flex>
	);
}
