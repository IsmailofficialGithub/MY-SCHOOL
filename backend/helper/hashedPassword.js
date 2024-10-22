import bcrypt from "bcrypt";

export const hashedPassword = async (plainPassword) => {
  let saltround = 10;
  try {
    const hash = await bcrypt.hash(plainPassword, saltround);
    return hash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const comparePassword=async(plainPassword,hash)=>{
     return bcrypt.compare(plainPassword,hash)
}