import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@prisma/client";
import { ObjectId } from "bson";

const AuthRequired = createParamDecorator((_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const user = {
        userId: 'testUser',
        password: 'testPassword',
        id: new ObjectId()
    }
    delete user.password;
    return user;
})

export default AuthRequired