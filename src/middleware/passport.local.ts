import { compare } from "bcrypt";
import passport, { use } from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserWithRoleById, isUsernameExist } from "services/client/auth.service";
import { getUserById } from "services/user.service";

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

    passport.deserializeUser(async function (id: string, callback) {
        const userInDB = await getUserWithRoleById(id);
        return callback(null, userInDB);
    });
}



export default configPassportLocal;
