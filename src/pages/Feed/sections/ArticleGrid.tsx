import { useEffect, useState } from "react";

// @chakra
import { Flex } from "@chakra-ui/react";
import { ArticleCard } from "../../../components/ArticleCard";

// types
import { Article } from "../../../types/Article";

type Props = {
  term: string
}

export function ArticleGrid({ term }: Props) {
	const [articles, setArticles] = useState<Article[]>([]);

	async function handleGetArticles() {
		await fetch(
			`https://newsapi.org/v2/everything?q=${term}&sortBy=publishedAt&apiKey=3bf9c14f840245fcb11c521bfee34767&language=pt`, {
				method: "GET",
			}).then((response) => response.json()).then((responseData) => {
			console.log(responseData);
			setArticles(responseData.articles);
		});
	}

	useEffect(() => {
		handleGetArticles();
	}, []);

	return (
		<Flex
			flex="1"
			flexDirection="column"
			height={750}
			overflow={"auto"}
			sx={{
				"&::-webkit-scrollbar": {
					width: "6px",
					height: 0,
				},
				"&::-webkit-scrollbar-track": {
					background: "transparent",
				},
				"&::-webkit-scrollbar-thumb": {
					background: "gray.700",
					height: "100px",
					borderRadius: 50
				}
			}}
		>
			{articles.map((article, index) => (
				<ArticleCard article={article} key={index} />
			))}
		</Flex>
	);
}
