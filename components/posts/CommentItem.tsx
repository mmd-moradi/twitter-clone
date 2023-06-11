import { formatDistanceToNowStrict } from "date-fns"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import Avatar from "../Avatar"

interface CommentItemProps {
    data: Record<string, any>
}

const CommentItem:React.FC<CommentItemProps> = ({ data }) => {
    const router = useRouter()
    const goToUser = useCallback((event: any) => {
        event.stopPropagation();
        router.push(`/users/${data.user.id}`)
    }, [router ,data.user.id])

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createAt])
  return (
    <div className="p-5 border-b-[1px] border-neutral-800 hover:bg-neutral-900 transition cursor-pointer">
        <div className="flex flex-row gap-3 items-start">
            <Avatar userId={data.user.id} />
            <div>
                <div className="flex flex-row gap-2 items-center">
                    <p onClick={goToUser} className="text-white font-semibold hover:underline cursor-pointer">
                        {data.user.name}
                    </p>
                    <span onClick={goToUser} className="text-neutral-500 cursor-pointer hidden md:block">
                        @{data.user.username}
                    </span>
                    <span className="text-neutral-500 gap-1">.</span>
                    <span className="text-neutral-500 text-sm">{createdAt}</span>
                </div>
                <div className="text-white mt-1">
                    {data.body}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CommentItem