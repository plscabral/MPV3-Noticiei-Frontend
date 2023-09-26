import { Text } from "@chakra-ui/react";

export function Logo() {
	return (
		<Text
			fontSize={["2xl", "4xl"]}
			fontWeight="bold"
			letterSpacing="tight"
		>
      noticiei
			<Text as="span" color="cyan.500">.</Text>
		</Text>
	);
}
