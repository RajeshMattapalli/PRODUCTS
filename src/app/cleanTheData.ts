const cleanTheData = data =>
    data.map((obj, index) => {
        obj.key = index.toString();
        return obj;
    });

export default cleanTheData;
