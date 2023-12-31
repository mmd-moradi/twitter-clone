import { useCallback, useMemo } from "react"
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal"
import usePost from "./usePost"
import usePosts from "./usePosts"
import { toast } from "react-hot-toast"
import axios from "axios"

const useLike = ({ postId, userId } :{ postId: string, userId?: string }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);
    const logingModal = useLoginModal();
    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];
        return list.includes(currentUser?.id);
    }, [fetchedPost?.likedIds, currentUser?.id])
    const toggleLike = useCallback( async () => {
        if (!currentUser) {
            return logingModal.onOpen();
        }
        try{
            let request;
            if ( hasLiked ) {
                request = () => (axios.delete("/api/like", {params: {postId}}))
            } else {
                request = () => (axios.post("/api/like", { postId }))
            }
            await request();
            mutateFetchedPost();
            mutateFetchedPosts();
            toast.success("Success")
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }

    }, [currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, logingModal])
    
    return { hasLiked , toggleLike }
}

export default useLike;