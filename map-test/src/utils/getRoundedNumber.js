export const getRoundedNumber = (num) =>{
   const number = Math.round((num + Number.EPSILON) * 100) / 100
   return number
}