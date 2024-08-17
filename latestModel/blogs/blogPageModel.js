import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    category: { type: String },
    blogTitle: { type: String },
    readTime: { type: String },
    date: { type: String },
    views: { type: String },
    blogCardData: {
        title: { type: String },
        subTitle: { type: String },
        cardImage: { type: String }
    },
    headerData: {
        headerBgImage: { type: String },
        headerTitle: { type: String },
        headerSubTitle: { type: String }
    },
    articleData: [{
        title: { type: String },
        description: { type: String }
    }]
});

const blogModel = mongoose.model('blogData', blogSchema);

export default blogModel;