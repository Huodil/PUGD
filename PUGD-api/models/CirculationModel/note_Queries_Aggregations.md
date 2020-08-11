
db.copies.aggregate([
    {
        $lookup: {
            from: "Reservations",
            let: {
                id: "$_id"
            },
            pipeline: [
                {
                    $match: {
                        confirmed: false,
                        $expr: {
                            $eq: [
                                "$idcopy",
                                "$$id"
                            ]
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        idcopy: 0
                    }
                }
            ],
            as: "Reserved"
        }
    },
    {
        $match: {
            "Reserved.0": {
                $exists: true
            }
        }
    },
    {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: [
                    "$$ROOT",
                    {
                        $arrayElemAt: [
                            "$Reserved",
                            0
                        ]
                    }
                ]
            }
        }
    }
])

db.copies.aggregate([
    {
        $lookup: {
            from: "Prets",
            let: {
                id: "$_id"
            },
            pipeline: [
                {
                    $match: {
                        is_preted: true,
                        $expr: {
                            $eq: [
                                "$idcopy",
                                "$$id"
                            ]
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        idcopy: 0,
                        prologement:0,
                        date_init:0,
                    }
                }
            ],
            as: "Preted"
        }
    },
    {
        $match: {
            "Preted.0": {
                $exists: true
            }
        }
    },
    {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: [
                    "$$ROOT",
                    {
                        $arrayElemAt: [
                            "$Preted",
                            0
                        ]
                    }
                ]
            }
        }
    }
])
