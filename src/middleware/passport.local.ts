import { compare } from "bcrypt";
import passport, { use } from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { getCartByUserId, getUserWithRoleById, isUsernameExist } from "services/client/auth.service";

const configPassportLocal = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, async function verify(req, username, password, callback) {
        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = [];
        }
        const user = await isUsernameExist(username);
        if (!user) {
            return callback(null, false, { message: `Username/password invalid.` });
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return callback(null, false, { message: 'Username/password invalid.' })
        }
        return callback(null, user as any);
    }));

    passport.serializeUser(function (user: any, callback) {
        return callback(null, user.id);
    });

    passport.deserializeUser(async function (userId: string, callback) {
        const userInDB: any = await getUserWithRoleById(userId);
        const sumCart = await getCartByUserId(userId);
        return callback(null, { ...userInDB, sumCart });
    });
}



export default configPassportLocal;
