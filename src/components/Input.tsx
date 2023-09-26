import { forwardRef, ForwardRefRenderFunction, ReactNode, useState } from "react";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// Components
import {
	Input as ChakraInput,
	InputProps as ChakraInputProps,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Icon,
	Button,
} from "@chakra-ui/react";

// Interfaces
interface InputProps extends ChakraInputProps {
  name: string;
  textLabel?: string;
  error?: string;
  icon?: ReactNode;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, type, textLabel, error = null, icon, ...rest }, ref) => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	return (
		<FormControl id={name} isInvalid={!!error}>
			{!!error && <FormErrorMessage mb="2">{error}</FormErrorMessage>}
			{!!textLabel && <FormLabel size="xl">{textLabel}</FormLabel>}

			<InputGroup>
				{
					icon && (
						<InputLeftElement h="100%" pointerEvents='none'>
							{icon}
						</InputLeftElement>
					)
				}
				{
					type !== "password" ? (
						<ChakraInput
							id={name}
							name={name}
							ref={ref}
							type={type}
							focusBorderColor="cyan.400"
							{...rest}
						/>
					) : (
						<ChakraInput
							id={name}
							name={name}
							ref={ref}
							type={show ? "text" : "password"}
							focusBorderColor="cyan.400"
							{...rest}
						/>
					)
				}

				{
					type === "password" && (
						<InputRightElement h="100%">
							<Button onClick={handleClick} bg="transparent" variant="link" >
								{show
									? <Icon as={MdVisibilityOff} color="cyan.400" />
									: <Icon as={MdVisibility} color="cyan.400" />
								}
							</Button>
						</InputRightElement>
					)
				}
			</InputGroup>
		</FormControl>
	);
};

export const Input = forwardRef(InputBase);
