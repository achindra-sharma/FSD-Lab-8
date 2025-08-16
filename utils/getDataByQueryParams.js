export const getDataByQueryParams = (data, queryObj) => {
  const { level, category } = queryObj;

  let filteredData = [...data];

  if (level) {
    filteredData = filteredData.filter(course => course.level.toLowerCase() === level.toLowerCase());
  }

  if (category) {
    filteredData = filteredData.filter(course => course.category.toLowerCase() === category.toLowerCase());
  }

  return filteredData;
};