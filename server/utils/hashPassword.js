import bcrypt from 'bcrypt'

async function hashPassword(password){
    const saltRounds = 9; 
    const hashedPassword = await bcrypt.hash(password , saltRounds);
    return hashedPassword
}

async function compareHash(plainPassword , hashedPassword) {
    const match = await bcrypt.compare(plainPassword , hashedPassword)
    if(match) return true 
    else return false
}

export {hashPassword , compareHash}