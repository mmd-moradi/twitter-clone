import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { Router, useRouter } from "next/router";
import { useCallback, useReducer } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs"

interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    onclick?: () => void;
    auth?: boolean;
    alert?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    href,
    icon: Icon,
    onclick,
    auth,
    alert
}) => {
    const loginModal = useLoginModal();
    const {data: currentUser} = useCurrentUser();
    const router = useRouter();
    const handleClick = useCallback(() => {
        if (onclick) {
            onclick();
        }

        if (auth && !currentUser) {
            loginModal.onOpen();
        }else if (href) {
            router.push(href)
        }
    }, [onclick, router, href, auth, currentUser, loginModal])

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
        <div className="relative rounded-full h-14 w-14 flex items-center
        justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden
        ">
            <Icon size={28} color="white"/>
            { alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
        </div>
        <div className="relative hidden lg:flex gap-4 rounded-full items-center
        p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer
        ">
            <Icon size={24} color="white"/>
            <p className="hidden lg:block text-white text-xl">{label}</p>
            { alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}

        </div>
    </div>
  )
}
export default SidebarItem;