export const disabledAddField = fields => {
  const condition = field => field === '';
  return fields.some(condition);
};
