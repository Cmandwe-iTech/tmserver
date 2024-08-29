import crashCourseModel from '../../latestModel/crashCourse/crashCourseModel.js'; // adjust the path as necessary

export const createCrashCourse = async (req, res) => {
    try {
        const { category, crashCourseCard } = req.body;

        let parseCrashCourseCard = JSON.parse(crashCourseCard);

        const newCrashCourse = new crashCourseModel({
            category,
            crashCourseCard: parseCrashCourseCard
        });

        await newCrashCourse.save();
        res.status(201).json({ message: 'Crash Course created', newCrashCourse });

    } catch (error) {
        res.status(500).json({ message: 'Error creating Crash Course', error: error.message });
    }
};

export const getCrashCourses = async (req, res) => {
    try {
        const crashCourses = await crashCourseModel.find();
        res.status(200).json(crashCourses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Crash Courses', error: error.message });
    }
};

export const getCrashCourseByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const crashCourse = await crashCourseModel.find({ category: category });
        if (!crashCourse) return res.status(404).json({ message: 'Crash Course not found' });
        res.status(200).json(crashCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Crash Course', error: error.message });
    }
};

export const getCrashCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const crashCourse = await crashCourseModel.findById(id);
        if (!crashCourse) return res.status(404).json({ message: 'Crash Course not found' });
        res.status(200).json(crashCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Crash Course', error: error.message });
    }
};

export const editCrashCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, crashCourseCard } = req.body;

        let parseCrashCourseCard = JSON.parse(crashCourseCard);

        const updatedCrashCourse = await crashCourseModel.findByIdAndUpdate(
            id,
            {
                category,
                crashCourseCard: parseCrashCourseCard,
            },
            { new: true }
        );

        if (!updatedCrashCourse) return res.status(404).json({ message: 'Crash Course not found' });

        res.status(200).json({ message: 'Crash Course updated successfully', updatedCrashCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Crash Course', error: error.message });
    }
};


// Delete a crash course by ID
export const deleteCrashCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const crashCourse = await crashCourseModel.findById(id);

        if (!crashCourse) return res.status(404).json({ message: 'Crash Course not found' });

        await crashCourseModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Crash Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Crash Course', error: error.message });
    }
};
