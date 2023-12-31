import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";


interface FormsProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

const Form:React.FC<FormsProps> = ({
    placeholder,
    isComment,
    postId
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const {data: currentUser} = useCurrentUser();
    const {mutate: mutatePosts} = usePosts();
    const {mutate: mutatePost} = usePost(postId as string)

    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";
            await axios.post(url, { body })
            toast.success("Tweet Created")
            setBody("");
            mutatePost();
            mutatePosts();

        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts, mutatePost])
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
        {currentUser ? (
            <div className="flex flex-row gap-4">
                <div>
                    <Avatar userId={currentUser?.id} />
                </div>
                <div className="w-full">
                    <textarea disabled={isLoading} onChange={(e) => setBody(e.target.value)} value={body} className="
                    disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px]
                    placeholder-neutral-500 text-white" placeholder={placeholder}>
                    </textarea>
                    <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800
                    transition mb-1" />
                
                    <div className="mt-4 flex flex-row justify-end">
                        <Button label="Tweet" onClick={onSubmit} disabled={isLoading || !body}  />
            
                    </div>
                </div>
            </div>

        ) : (
            <>
            <div className="py-8">
                    <h1 className="text-white text-2xl font-bold mb-2 text-center">Welcome to Twitter</h1>
                </div>
                <div className="flex flex-row items-center justify-center gap-4 mb-2">
                    <Button label="Login" onClick={loginModal.onOpen} />
                    <Button label="Sign Up" secondarey onClick={registerModal.onOpen} />
            </div>
            </>
        )}
    </div>
  )
}

export default Form