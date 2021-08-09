module.exports.paginationResults = (model, query) => {
    return async (req, res, next) => {
        console.log(req.query.page, req.query.limit);
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find(query).limit(5).skip(1).exec()
            res.paginatedResults = results
            console.log(results);
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}