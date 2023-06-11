import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";


const RegisterModal = () => {
    const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [username, setUserName] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onToggle = useCallback(() => {
		if(isLoading) {
			return;
		}
		registerModal.onClose();
		loginModal.onOpen();
	}, [isLoading, registerModal, loginModal])

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);
			
			await axios.post("/api/register", {
				name,
				email,
				username,
				password
			});
			toast.success("Account successfully registered")

			signIn("credentials", {
				email,
				password
			})

			registerModal.onClose();
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	}, [registerModal, email, password, name, username])

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} disabled={isLoading} />
			<Input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
			<Input value={username} placeholder="User Name" onChange={(e) => setUserName(e.target.value)} disabled={isLoading} />
			<Input value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} disabled={isLoading} type="password" />
		</div>
	)
	
	const footerContent = (
		<div className="text-neutral-400 text-center mt-4">
			<p>Already have an account?
				<span onClick={onToggle} className="text-white cursor-pointer hover:underline"> Sign In</span>
			</p>
		</div>
	)

  return (
    <Modal isOpen={registerModal.isOpen} disabled={isLoading} actionLabel="Sign Up" onSubmit={onSubmit} onClose={registerModal.onClose}
	body={bodyContent} title="Create an account" footer={footerContent} />
  )
}

export default RegisterModal;