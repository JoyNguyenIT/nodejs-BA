import { prisma } from "./client";

const initSeeds = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "admin",
                    password: "admin",
                    fullName: "I'm admin",
                }
            ]
        })
    };
    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền",
                },
                {
                    name: "USER",
                    description: "Người dùng bình thường",
                },
            ]
        })
    };

}

export default initSeeds;