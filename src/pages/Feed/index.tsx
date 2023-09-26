import { useEffect, useState } from "react";

// utils
import { api } from "../../utils/api";

// @chakra
import {
	Flex,
	Tabs,
	Tab,
	TabList,
	TabPanels,
	TabPanel,
	useToast
} from "@chakra-ui/react";

// components
import { MasterPage } from "../../components/MasterPage";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

// sections
import { ArticleGrid } from "./sections/ArticleGrid";

// types
import { Term } from "../../types/Term";

export function Feed() {
	const toast = useToast({
		position: "bottom-right",
		duration: 4000,
		containerStyle: {
			mb: "20px"
		},
	});

	const [isLoading, setIsLoading] = useState(false);
	const [terms, setTerms] = useState<Term[]>([]);

	async function handleGetArticles() {
		try {
			setIsLoading(true);

			const response = await api.get("/terms");

			setTerms(response.data);
		}
		catch (err) {
			toast({
				title: "Error ao obter termos!",
				status: "error",
				isClosable: true
			});
		}
		finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		handleGetArticles();
	}, []);

	return (
		<MasterPage titlePage="Feed">
			<Flex direction="column" h="100%" >
				<Header />

				<Flex
					w="100%"
					my="6"
					maxW={1480}
					mx="auto"
					px="6"
				>
					<Sidebar />

					<Tabs colorScheme="cyan" variant='soft-rounded'>
						<TabList>
							{terms.map(term => <Tab key={term.id}>{term.description}</Tab>)}
						</TabList>

						<TabPanels>
							{terms.map(term => {
								return (
									<TabPanel key={term.id}>
										<ArticleGrid term={term.description} />
									</TabPanel>
								);
							})}
						</TabPanels>
					</Tabs>
				</Flex>
			</Flex>
		</MasterPage >
	);
}
