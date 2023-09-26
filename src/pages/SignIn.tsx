import { Link as LinkReactRouterDom } from "react-router-dom";

// hooks
import { useAuth } from "../hooks/useAuth";

// @chakra
import {
	Flex,
	VStack,
	Button,
	Text,
	Link
} from "@chakra-ui/react";
import { MasterPage } from "../components/MasterPage";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";

// forms
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldError } from "react-hook-form";

const signInValidationSchema = zod.object({
	email: zod.string().email("Informe um e-mail válido"),
	password: zod.string().min(6, "Informe uma senha com no mínimo 6 caracteres."),
});

type SignInFormData = zod.infer<typeof signInValidationSchema>

export function SignIn() {
	const { handleLogin, isLoading } = useAuth();

	const { register, handleSubmit, reset, formState: { errors } } = useForm<SignInFormData>({
		resolver: zodResolver(signInValidationSchema),
		defaultValues: {
			email: "",
			password: "",
		}
	});

	async function handleSignIn(data: SignInFormData) {
		await handleLogin(data.email, data.password);
		reset({});
	}

	return (
		<MasterPage titlePage="Início">
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
						onSubmit={handleSubmit(handleSignIn)}
					>
						<VStack spacing="5">
							<Logo />

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

							<Button
								type="submit"
								colorScheme="cyan"
								sx={{ width: "100%" }}
								borderRadius={8}
								isLoading={isLoading}
							>
                Entrar
							</Button>

							<Text color="gray.300">
                Não possui conta? {" "}
								<Link as={LinkReactRouterDom} to="/criar-conta">
									<Text as="strong">Crie sua conta</Text>
								</Link>
							</Text>
						</VStack>
					</Flex>
				</Flex>
			</Flex>
		</MasterPage>
	);
}
