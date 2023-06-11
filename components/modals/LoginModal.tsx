import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";


const LoginModal = () => {
    const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onToggle = useCallback(() => {
		if(isLoading) {
			return;
		}
		loginModal.onClose();
		registerModal.onOpen();
	}, [isLoading, registerModal, loginModal])

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);
			await signIn("credentials", {
				email,
                password,
			})
			toast.success('Logged in');
			loginModal.onClose();
		} catch (error) {
			console.log(error);
			toast.error("Somthing went wrong")
		} finally {
			setIsLoading(false);
		}
	}, [loginModal, email, password])

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
			<Input value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} disabled={isLoading}type="password"  />
		</div>
	)
	const footerContent = (
		<div className="text-neutral-400 text-center mt-4">
			<p>First time using Twitter?
				<span onClick={onToggle} className="text-white cursor-pointer hover:underline"> Sign Up</span>
			</p>
		</div>
	)
  return (
    <Modal isOpen={loginModal.isOpen} disabled={isLoading} actionLabel="Sign In" onSubmit={onSubmit} onClose={loginModal.onClose}
	body={bodyContent} title="Login" footer={footerContent} />
  )
}

export default LoginModal