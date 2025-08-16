export const getDataByPathParams = (data, id) => {
    return data.find(item => item.id === parseInt(id));
};