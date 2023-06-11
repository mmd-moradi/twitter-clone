import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
    data: Record<string, any>;
    userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
    const loginModal = useLoginModal();
    const goToUser = useCallback((event: any) => {
        event.stopPropagation();
        router.push(`/users/${data.user.id}`);
    }, [router, data.user.id]);
    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

    const onLike = useCallback((event: any) => {
        event.stopPropagation();
        if(!currentUser) {
            return loginModal.onOpen();
        }
        toggleLike();
    }, [loginModal, currentUser, toggleLike])

    const createdAt = useMemo(() => {
        if(!data?.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt])


    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
    const likedColor = hasLiked ? "text-red-500" : "";
    return (
    <div onClick={goToPost} className="mb-4 border-neutral-800 border-b-[1px] p-5 hover:bg-neutral-900 transition cursor-pointer">
        <div className="flex flex-row justify-start gap-3">
            <Avatar userId={data.user.id} />
            <div>
                <div className="flex flex-row items-center gap-2">
                    <p onClick={goToUser} className="text-white font-semibold hover:underline cursor-pointer">
                        {data.user.name}
                    </p>
                    <span onClick={goToUser} className="text-neutral-500 hidden md:block">
                        @{data.user.username}
                    </span>
                    <span className="text-neutral-500 text-sm">.</span>
                    <span className="text-neutral-500 text-sm">{createdAt}</span>
                </div>
                <div className="text-white mt-1">
                    {data.body}
                </div>
                <div className="flex flex-row gap-10 mt-3 items-center">
                    <div className="flex flex-row gap-2 cursor-pointer text-neutral-500 hover:text-sky-500 transition">
                        <AiOutlineMessage size={20} />
                        <p>
                            {data.comments?.length || 0}
                        </p>
                    </div>
                    <div onClick={onLike} className="flex flex-row gap-2 cursor-pointer text-neutral-500 hover:text-red-500 transition">
                        <LikeIcon size={20} className={likedColor} />
                        <p> 
                            {data.likedIds?.length || 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostItem