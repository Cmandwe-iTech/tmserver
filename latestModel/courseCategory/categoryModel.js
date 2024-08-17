import mongoose from "mongoose";

const categorySchema = ({
    courseCategory: { type: String },
    homeCard: {
        icon: { type: String },
        points: [],
    },
    headerData: {
        headerBgImage: { type: String },
        headerTitle: { type: String },
        headerSubTitle: { type: String }
    },
    courseStatistics:
    {
        Title: { type: String, },
        data: [{
            title: { type: String, },
            subTitle: { type: String, },
        }]
    }
})

export const categoryModel = mongoose.model('CourseCategoryData', categorySchema)

