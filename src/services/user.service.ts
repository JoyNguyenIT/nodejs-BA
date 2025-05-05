import getConnection from "config/database"
import { PrismaClient, Prisma } from '@prisma/client'
import { prisma } from "config/client"



const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string
) => {
    const newUser = await prisma.user.create({
        data: {
            username: fullName,
            password: ""
        },
    })
    return newUser
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany()
    return roles
}

const handleDeleteUser = async (id: string) => {
    const deleteUser = await prisma.user.delete({
        where: {
            id: +id,
        },
    })
}

const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +id,
        },
    })
    return user;
}

const handleUpdateUser = async (id: string, fullName: string, email: string, address: string) => {
    const updateUser = await prisma.user.update({
        where: {
            id: +id,
        },
        data: {
            username: fullName,
            password: "email",
        },
    })
    return updateUser;
}


export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, handleUpdateUser, getAllRoles }