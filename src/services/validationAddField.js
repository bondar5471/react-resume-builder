export const disablebAddField = (fields) => {
  const condition = (field) => field === ""
  return fields.some(condition)
}
