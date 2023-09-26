import {
	Card,
	CardBody,
	Link,
	Image,
	Stack,
	Heading,
	Text,
	Divider,
	Flex
} from "@chakra-ui/react";

// types
import { Article } from "../types/Article";

// utils
import { fDateTime } from "../utils/formatTime";

type Props = {
  article: Article
}

export function ArticleCard({ article }: Props) {
	return (
		<Card maxW='1280'>
			<CardBody
				display='flex'
				bg="gray.800"
				color="white"
				flex={1}
				justifyContent={"space-between"}
			>
				<Flex>
					<Image
						src={article.urlToImage}
						alt={article.description}
						borderRadius='lg'
						height={300}
					/>

					<Flex flexDirection={"column"} justify={"space-between"}>
						<Stack ml='6' spacing='3'>
							<Heading
								as={Link}
								href={article.url}
								size='md'
								_hover={{
									color: "cyan.400"
								}}
							>
								{article.title}
							</Heading>
							<Text>{article.content}</Text>
						</Stack>

						<Stack ml='6' spacing='1'>
							<Text color='gray.400'>Autor: {article.author}</Text>
							<Text color='gray.400' >Fonte: <Text as="span" textTransform="lowercase">{article.source.name}</Text></Text>
							<Text color='gray.400'>Publicado em: {fDateTime(article.publishedAt)}</Text>
						</Stack>
					</Flex>
				</Flex>

			</CardBody>

			<Divider />
		</Card>
	);
}
