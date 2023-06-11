import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import {format} from "date-fns";
import { useMemo } from "react";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";
interface UserBioProps {
    userId: string;
}


const UserBio:React.FC<UserBioProps> = ({ userId }) => {
    const {data: currentUser} = useCurrentUser();
    const {data: fetchedUser} = useUser(userId);
    const editModal = useEditModal();
    const { isFollowing, toggleFollow } = useFollow(userId);

    const createdAt = useMemo(() => {
        if(!fetchedUser?.createdAt){
            return null;
        }
        return format(new Date(fetchedUser?.createdAt), "MMMM yyyy") 
    }, [fetchedUser?.createdAt])
  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
        <div className=" flex justify-end p-2">
            {currentUser?.id === userId ? (
                <Button label="Edit" onClick={editModal.onOpen} secondarey />
            ): (
                <Button label={isFollowing ? "Unfollow" : "Follow"} onClick={toggleFollow} secondarey={!isFollowing} outline={isFollowing} />
            ) }
        </div>
        <div className="mt-8 px-4">
            <div className="flex flex-col ">
                <p className="text-white text-xl font-semibold">
                    {fetchedUser?.name}
                </p>
                <p className="text-neutral-500 text-md">
                    @{fetchedUser?.username}
                </p>
            </div>
            <div className="flex flex-col mt-4">
                <p className="text-white">
                    {fetchedUser?.bio}
                </p>
                <div className="mt-4 flex gap-2 flex-row text-neutral-500 items-center">
                    <BiCalendar size={24}/>
                    <p>Joined {createdAt}</p>
                </div>
            </div>
            <div className="flex flex-row gap-6 mt-4 items-center">
                <div className="flex flex-row gap-1 items-center">
                    <p className="text-white">{fetchedUser?.followingId?.length}</p>
                    <p className="text-neutral-500">Following</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <p className="text-white">{fetchedUser?.followersCount || 0}</p>
                    <p className="text-neutral-500">Followers</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserBio