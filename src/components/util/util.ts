// @ts-nocheck

const getValues = (category, data) => {
  const values = [];
  const newData = data.reduce(
    (cache, expense) => ({
      ...cache,
      [expense[category]]:
        expense[category] in cache
          ? cache[expense[category]].concat(expense)
          : [expense],
    }),
    {}
  );

  for (const key in newData) {
    if (newData.hasOwnProperty(key)) {
      const result = newData[key].reduce((acc, obj) => {
        return acc + Number(obj.amount.replace(/[^0-9.-]+/g, ""));
      }, 0);
      values.push({ key, result });
    }
  }

  return values;
};

const exportFunctions = {
  getValues,
};

export default exportFunctions;
