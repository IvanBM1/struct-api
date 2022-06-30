
module.exports = {
    metadata,
    float,
    boolean
}

function metadata(page, limit, total, items, query) {

    const pages = Math.ceil(total/limit)
    const next = ((page+1)*limit) < total ? page+1 : null
    const previous = page > 0? page-1 : null

    return {
        page,
        limit,
        items,
        total,
        next,
        previous,
        pages,
        query
    }
}

function float(value, fixed = 2) {
    return parseFloat(parseFloat(value).toFixed(fixed))
}

function boolean(value) {

    if(typeof value === 'string')
        value = value.toLocaleLowerCase()

    return value === 'true' || value === 'si' ? true : false
}
