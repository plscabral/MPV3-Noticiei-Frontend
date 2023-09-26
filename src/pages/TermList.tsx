import { useEffect, useState } from "react";
import { Link as LinkReactRouterDom } from "react-router-dom";

// utils
import { api } from "../utils/api";
import { fDateTime } from "../utils/formatTime";

// @chakra
import {
	Flex,
	Box,
	Heading,
	Link,
	Button,
	Icon,
	Spinner,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	IconButton,
	useToast
} from "@chakra-ui/react";

// components
import { MasterPage } from "../components/MasterPage";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

// types
import { Term } from "../types/Term";

// icons
import { RiAddLine, RiDeleteBinFill } from "react-icons/ri";

export function TermList() {
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

	async function handleDeleteTerm(id: string) {
		try {
			setIsLoading(true);

			const response = await api.delete(`/terms/${id}`);

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

		handleGetArticles();
	}

	useEffect(() => {
		handleGetArticles();
	}, []);

	return (
		<MasterPage titlePage="Termos">
			<Flex direction="column" h="100vh">
				<Header />

				<Flex
					w="100%"
					my="6"
					maxW={1480}
					mx="auto"
					px="6"
				>
					<Sidebar />

					<Box
						flex="1"
						borderRadius={8}
						p="8"
						height={750}
						overflow={"auto"}
						sx={{
							"&::-webkit-scrollbar": {
								width: "6px",
								height: 0,
							},
							"&::-webkit-scrollbar-track": {
								background: "transparent"
							},
							"&::-webkit-scrollbar-thumb": {
								background: "gray.700",
								borderRadius: 50
							}
						}}
					>
						<Flex mb="8" justify="space-between" align="center">
							<Heading size="lg" fontWeight="normal">
                Termos
							</Heading>

							<Link as={LinkReactRouterDom} to="/termos/criar-novo">
								<Button
									as="a"
									size="sm"
									fontSize="sm"
									colorScheme="cyan"
									leftIcon={<Icon as={RiAddLine} fontSize="20" />}
								>
                  Criar novo
								</Button>
							</Link>
						</Flex>

						{
							isLoading ? (
								<Flex justify="center">
									<Spinner />
								</Flex>
							) : (
								<Table colorScheme="whiteAlpha">
									<Thead>
										<Th>Termo</Th>
										<Th>Data Cadastro</Th>
										<Th w="8"></Th>
									</Thead>

									<Tbody>
										{
											terms.map(term => {
												return (
													<Tr key={term.id}>
														<Td>{term.description}</Td>
														<Td>{fDateTime(term.created_at)}</Td>
														<Td>
															<IconButton
																aria-label=""
																icon={<RiDeleteBinFill fontSize="18px" />}
																bg="red.500"
																transition="filter(0.2)"
																_hover={{
																	filter: "brightness(0.9)"
																}}
																onClick={() => handleDeleteTerm(String(term.id))}
															/>
														</Td>
													</Tr>
												);
											})
										}
									</Tbody>
								</Table>
							)
						}
					</Box>
				</Flex>
			</Flex>
		</MasterPage>
	);
}
