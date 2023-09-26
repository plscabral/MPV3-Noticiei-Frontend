import { ElementType } from "react";
import {
	Link as ChakraLink,
	LinkProps as ChakraLinkProps,
	Icon,
	Text
} from "@chakra-ui/react";
import { ActiveLink } from "../ActiveLink";

interface Props extends ChakraLinkProps {
  icon: ElementType;
  text: string;
  href: string;
}

export function NavLink({ icon, text, href, ...rest }: Props) {
	return (
		<ActiveLink to={href}>
			<ChakraLink display="flex" align="center" style={{ textDecoration: "none" }} {...rest}>
				<Icon as={icon} fontSize="20" />
				<Text ml="4" fontWeight="medium" transition="filter 0.2s" _hover={{
					filter: "brightness(0.9)"
				}}>{text}</Text>
			</ChakraLink>
		</ActiveLink>
	);
}
