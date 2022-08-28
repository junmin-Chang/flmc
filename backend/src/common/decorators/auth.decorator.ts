import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@prisma/client";
import { ObjectId } from "bson";

const AuthRequired = createParamDecorator((_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const user = {
        userId: 'testUser',
        password: 'testPassword',
        id: "630b08f6e68b919e2d2b82a5"
    }
    delete user.password;
    return user;
})

export default AuthRequired