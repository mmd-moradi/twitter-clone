import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if(req.method !== "POST" && req.method !== "DELETE"){
        return res.status(405).end();
    }
    try {
        const userId = req.method === "POST" ? req.body.userId : req.query.userId;
        const { currentUser } = await serverAuth(req, res);
        if(!userId || typeof userId !== "string") {
            throw new Error("Invalid ID");
        }
        
        const user = await prisma.user.findUnique({
            where: {
                id: currentUser.id
            }
        });
        
        if(!user) {
            throw new Error("Invalid ID");
        }
        let updatedFollowingIds = [...(user.followingId || [])]
        
        if(req.method === "POST") {
            updatedFollowingIds.push(userId);
            try {
                await prisma.notification.create({
                    data: {
                        body: "Someone followed you!",
                        userId
                    }
                })
                await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        hasNotifications: true
                    }
                })
    
            } catch (err) {
                console.log(err)
            }
        }
        if(req.method === "DELETE") {
            updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId)
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingId: updatedFollowingIds
            }
        });
        return res.status(200).json(updatedUser);

    } catch (err) {
        console.log(err);
        return res.status(400).end()
    }
}