// @ts-nocheck

const getValues = (category, data) => {
  const values = [];
  // reduce the data array into categories
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
  //  loops thru the categories and adds the individual amounts
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

// had to export this function this way to be able to mock it in jest test
const helpers = {
  getValues,
};

export default helpers;
