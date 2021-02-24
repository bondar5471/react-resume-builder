const backStepPath = path => {
  const splitUrl = path.split('/');
  splitUrl.pop();
  const backUrl = splitUrl.join('/');
  return backUrl;
};

export { backStepPath };
