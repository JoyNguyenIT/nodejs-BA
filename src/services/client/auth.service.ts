import bcrypt from 'bcrypt';
import { PrismaClient, Prisma } from '@prisma/client'
import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constant"
import exp from 'node:constants';
import { hashPassword } from 'services/user.service';
import { use } from 'passport';
import { getCartDetails } from './item.service';

const findRole = async (name: string = 'USER') => {
    const UserRole = await prisma.role.findUnique({
        where: {
            name: name,
        },
    })
    return UserRole;
}

const comparePassword = async (password: string, hash: string) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

const isUsernameExist = async (username: string) => {
    const email = await prisma.user.findUnique({
        where: {
            username: username,
        },
    })
    return email;
}

const handleRegisterUser = async (
    fullName: string, username: string, password: string) => {
    const UserRole = await findRole();
    const userName = await isUsernameExist(username);
    if (UserRole || !userName) {
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: await hashPassword(password),
                fullName: fullName,
                roleId: UserRole.id,
                accountType: ACCOUNT_TYPE.SYSTEM
            },

        })
    }
    if (!UserRole) {
        throw new Error('Role not found');
    }
    if (userName) {
        throw new Error('Username already exists');
    }
}

const getUserWithRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +id,
        },
        include: {
            role: true,
        },
        omit: {
            password: true,
        }
    })
    return user;
}

const getCartByUserId = async (id: string) => {
    const cartDetails = await getCartDetails(+id);
    const sumCart = cartDetails?.length ?? 0;
    return sumCart;
}

export { handleRegisterUser, findRole, isUsernameExist, comparePassword, getUserWithRoleById, getCartByUserId }