const databaseConection = require("../database/sqlite")
const {hash,compare} = require("bcryptjs")

class UserControllers {
    async create (request,response) {
        const {name,email,password} = request.body  

        const database = await databaseConection()

        const userExists = await database.get("select * from users where email = (?)",[email])

        if (!name) {
            return response.status(404).json({
                status: "Error",
                message: "Name is missing"
            })
        }

        if (!email) {
            return response.status(404).json({
                status: "Error",
                message: "email is missing"
            })
        }

        if(!password) {
            return response.status(404).json({
                status: "Error",
                message: "Password is missing"
            })
        }

        if (userExists) {
            return response.status(409).json({
                status: "Error",
                message: "This email is already in use"
            })
        }

        const hashedpassword = await hash(password,8)

        await database.run("insert into users (name,email,password,old_password) values (?,?,?,?)",[name,email,hashedpassword,hashedpassword])

        return response.status(200).json({
            message: "User created"
        })

    }
    async update (request,response) {
        const {name,email,password,old_password} = request.body
        const {id} = request.params 

        const database = await databaseConection()

        const user = await database.get("select * from users where id = (?)",[id])

        if (!user) {
            return response.status(409).json({
                status: "Error",
                message: "This user not exists"
            })
        }
        const hashCompare = await compare(old_password, user.password)
        
        if (!old_password || !name || !email || !password) {
            return response.status(400).json({
                status: "Error",
                message: "Data is missing"
            })
        }

        if (!hashCompare) {
             return response.status(409).json({
                status: "Error",
                message: "Old password do not confer"
            })
        }

        const hashedpassword = await hash(password,8)

        await database.run("update users set email = ?, name = ?, password = ?, old_password = ? where id = ?", [email,name,hashedpassword,user.password, id])

        return response.status(200).json({
            message: "User updated"
        })


    }
}

module.exports = UserControllers