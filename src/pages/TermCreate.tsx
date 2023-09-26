import { useState } from "react";
import { Link as LinkReactRouterDom, useNavigate } from "react-router-dom";

// utils
import { api } from "../utils/api";

// @chakra
import {
	Flex,
	Box,
	Heading,
	Divider,
	VStack,
	SimpleGrid,
	HStack,
	Button,
	Link,
	useToast
} from "@chakra-ui/react";

// components
import { MasterPage } from "../components/MasterPage";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

// forms
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldError } from "react-hook-form";
import { Input } from "../components/Input";

const createNewTermValidationSchema = zod.object({
	description: zod.string().min(1, { message: "O termo deve ser informado." })
});

type CreateNewTermFormData = zod.infer<typeof createNewTermValidationSchema>

export function TermCreate() {
	const navigate = useNavigate();

	const toast = useToast({
		position: "bottom-right",
		duration: 4000,
		containerStyle: {
			mb: "20px"
		},
	});

	const [isLoading, setIsLoading] = useState(false);

	const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateNewTermFormData>({
		resolver: zodResolver(createNewTermValidationSchema),
		defaultValues: {
			description: "",
		}
	});

	async function handleCreateNewTerm(data: CreateNewTermFormData) {
		setIsLoading(true);

		try {
			let response = await api.post("/terms", {
				description: data.description
			});

			toast({ title: "Termo criado com sucesso!", status: "success" });

			reset();

			navigate("/termos");
		} catch (err) {
			toast({ title: "Erro ao criar termo, espere alguns minutos e tente novamente!", status: "error" });
			console.log(err);
		}
		finally {
			setIsLoading(false);
		}
	}

	return (
		<MasterPage titlePage="Criar termo">
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
						as="form"
						flex="1"
						borderRadius={8}
						bg="gray.800"
						p={["6", "8"]}
						onSubmit={handleSubmit(handleCreateNewTerm)}
					>
						<Heading size="lg" fontWeight="normal">
              Criar termo
						</Heading>

						<Divider my="6" borderColor="gray.700" />

						<VStack spacing="8">
							<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
								<Input
									placeholder="Informe o termo que deseja pesquisar"
									size="lg"
									error={errors.description && (errors.description as FieldError).message}
									{...register("description")}
								/>
							</SimpleGrid>
						</VStack>

						<Flex mt="8" justify="flex-end">
							<HStack spacing="4">
								<Link as={LinkReactRouterDom} to="/termos">
									<Button colorScheme="whiteAlpha">
                    Cancelar
									</Button>
								</Link>

								<Button
									colorScheme="cyan"
									type="submit"
									isLoading={isLoading}
								>
                  Salvar
								</Button>
							</HStack>
						</Flex>
					</Box>
				</Flex>
			</Flex>
		</MasterPage>
	);
}
