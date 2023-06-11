import Header from "@/components/Header"
import NotificationsFeed from "@/components/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";



export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    if(!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    return {
        props: {
            session
        }
    }
}

const notifications = () => {

  return (
    <>
        <Header label="Notifications" showBackArrow />
        <NotificationsFeed />
    </>
  );
}

export default notifications