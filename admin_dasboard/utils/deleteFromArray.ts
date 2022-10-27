// delete item from array using id
export const deleteFromArray = (id: string, array: []) => {
  return array.filter((item: any) => item._id !== id);
};
