const getValues = (category: string, data: {}[]) => {
  const values = [];
  // reduce the data array into categories
  const newData: { [key: string]: any } = data.reduce(
    (cache: { [key: string]: string }, expense: { [key: string]: string }) => ({
      ...cache,
      [expense[category]]:
        expense[category] in cache ? cache[expense[category]] : [expense],
    }),
    {}
  );
  //  loops thru the categories and adds the individual amounts
  for (const key in newData) {
    if (newData.hasOwnProperty(key)) {
      const result = newData[key].reduce(
        (acc: number, obj: { [key: string]: string }) => {
          return acc + Number(obj.amount.replace(/[^0-9.-]+/g, ""));
        },
        0
      );
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
