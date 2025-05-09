import getConnection from "config/database"
import { PrismaClient, Prisma } from '@prisma/client'
import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constant"
import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}



const handleCreateUser = async (
    fullName: string, username: string, password: string, address: string, phone: string, avatar: string, role: string
) => {
    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: await hashPassword(password),
            fullName: fullName,
            address: address,
            phone: phone,
            avatar: avatar,
            roleId: +role,
            accountType: ACCOUNT_TYPE.SYSTEM
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

const handleUpdateUser = async (id: string, fullName: string, phone: string, address: string, role: string, avatar: string) => {

    const updateUser = await prisma.user.update({
        where: {
            id: +id,
        },
        data: {
            fullName: fullName,
            phone: phone,
            address: address,
            roleId: +role,
            ...(avatar !== undefined && { avatar: avatar })
        },
    })
    return updateUser;
}


export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, handleUpdateUser, getAllRoles, hashPassword }