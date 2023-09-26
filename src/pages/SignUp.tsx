import { useState } from "react";

// routes
import { Link as LinkReactRouterDom, useNavigate } from "react-router-dom";

// utils
import { api } from "../utils/api";

// @chakra
import {
	Flex,
	VStack,
	Button,
	Text,
	Link,
	Heading,
	useToast
} from "@chakra-ui/react";
import { MasterPage } from "../components/MasterPage";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";


// forms
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldError } from "react-hook-form";

const signUpValidationSchema = zod.object({
	name: zod.string().min(1, { message: "O nome deve ser informado." }),
	email: zod.string().email("Informe um e-mail válido"),
	password: zod.string().min(6, "Informe uma senha com no mínimo 6 caracteres."),
	confirmPassword: zod.string()
}).refine((data) => data.password === data.confirmPassword, {
	message: "As senhas devem ser iguais.",
	path: ["confirmPassword"],
});

type SignUpFormData = zod.infer<typeof signUpValidationSchema>

export function SignUp() {
	const navigate = useNavigate();

	const toast = useToast({
		position: "bottom-right",
		duration: 4000,
		containerStyle: {
			mb: "20px"
		},
	});

	const { register, handleSubmit, reset, formState: { errors } } = useForm<SignUpFormData>({
		resolver: zodResolver(signUpValidationSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	});

	const [isLoading, setIsLoading] = useState(false);

	async function handleSignUp(data: SignUpFormData) {
		setIsLoading(true);

		try {
			let response = await api.post("/users", {
				name: data.name,
				email: data.email,
				password: data.password
			});

			toast({ title: "Conta criada com sucesso!", status: "success" });

			reset();

			navigate("/");
		} catch (err) {
			toast({ title: "Erro ao criar conta, espere alguns minutos e tente novamente!", status: "error" });
			console.log(err);
		}
		finally {
			setIsLoading(false);
		}
	}

	return (
		<MasterPage titlePage="Criar conta">
			<Flex as="main"
				flex="8"
				flexDirection="column"
				align="center"
				justify="center"
				h="100vh"
			>
				<Flex
					w="100%"
					flexDirection="column"
					align="center"
					justify="center"
				>
					<Flex
						as={"form"}
						w="100%"
						maxW={["300px", "400px"]}
						flexDirection="column"
						onSubmit={handleSubmit(handleSignUp)}
					>
						<VStack spacing="5" width={"100%"}>
							<Flex flex={1} width={"100%"} justify={"center"} align={"center"}>
								<Logo />
							</Flex>

							<Heading
								size="sm"
								fontWeight={"normal"}
							>
                Preencha os campos abaixo:
							</Heading>

							<Input
								placeholder="Nome"
								borderRadius={8}
								size="md"
								error={errors.name && (errors.name as FieldError).message}
								{...register("name")}
							/>

							<Input
								placeholder="E-mail"
								type="e-mail"
								borderRadius={8}
								size="md"
								error={errors.email && (errors.email as FieldError).message}
								{...register("email")}
							/>

							<Input
								type="password"
								placeholder="Senha"
								borderRadius={8}
								size="md"
								error={errors.password && (errors.password as FieldError).message}
								{...register("password")}
							/>

							<Input
								type="password"
								placeholder="Confirmar senha"
								borderRadius={8}
								size="md"
								error={errors.confirmPassword && (errors.confirmPassword as FieldError).message}
								{...register("confirmPassword")}
							/>

							<Button
								type="submit"
								colorScheme="cyan"
								sx={{ width: "100%" }}
								borderRadius={8}
								isLoading={isLoading}
							>
                Confirmar
							</Button>

							<Text color="gray.300">
                Já possui conta? {" "}
								<Link as={LinkReactRouterDom} to="/">
									<Text as="strong">Voltar</Text>
								</Link>
							</Text>
						</VStack>
					</Flex>
				</Flex>
			</Flex>
		</MasterPage>
	);
}
