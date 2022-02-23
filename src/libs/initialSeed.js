import Role from "../models/role";
import User from "../models/user";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
             new Role({ name: "client" }).save(),
             new Role({ name: "admin" }).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
}

export const createAdmin = async () => {
    const user = await User.findOne({ email: "admin@admin.com" });
    const roles = await Role.find({ name: { $in: ["admin"] } });

    if (!user) {
        await User.create({
            username: "admin",
            email: "admin@admin.com",
            password: await bcrypt.hash("admin", 10),
            name: "Lorem",
            secondname: "Ipsum",
            roles: roles.map((role) => role._id),
        });
        console.log('Admin User Created!')
    }
};
