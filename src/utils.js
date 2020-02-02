module.exports.paginate = (query,  page = 1, pageSize = 100 ) => {
    const checkedPageSize = (pageSize > 100)?100:pageSize; //max page size set to 100
    const offset = (page-1) * checkedPageSize;
    const limit = checkedPageSize;

    return {
        ...query,
        offset,
        limit,
    };
};