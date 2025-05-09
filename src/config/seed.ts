import { hashPassword } from "services/user.service";
import { prisma } from "./client";

const initSeeds = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
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
    if (countUser === 0) {
        const adminRole = await prisma.role.findFirst({
            where: {
                name: "ADMIN",
            }
        })
        if (adminRole) {
            await prisma.user.createMany({
                data: [
                    {
                        roleId: adminRole?.id,
                        username: "admin",
                        password: await hashPassword("123456"),
                        fullName: "I'm admin",
                    },
                    {
                        roleId: adminRole?.id,
                        username: "user",
                        password: await hashPassword("123456"),
                        fullName: "I'm user",
                    },
                ]
            })
        }

    };

}

export default initSeeds;