// Progress Calculator Utilities

export const calculateCareerProgress = (career) => {
    if (!career || !career.weeks || career.weeks.length === 0) {
        return 0;
    }

    const allSubtopics = career.weeks.flatMap(week => week.subtopics || []);

    if (allSubtopics.length === 0) {
        return 0;
    }

    const completedSubtopics = allSubtopics.filter(subtopic => subtopic.completed);
    return Math.round((completedSubtopics.length / allSubtopics.length) * 100);
};

export const calculateWeekProgress = (week) => {
    if (!week || !week.subtopics || week.subtopics.length === 0) {
        return 0;
    }

    const completedSubtopics = week.subtopics.filter(subtopic => subtopic.completed);
    return Math.round((completedSubtopics.length / week.subtopics.length) * 100);
};

export const getTotalSubtopics = (career) => {
    if (!career || !career.weeks) {
        return 0;
    }

    return career.weeks.reduce((total, week) => {
        return total + (week.subtopics ? week.subtopics.length : 0);
    }, 0);
};

export const getCompletedSubtopics = (career) => {
    if (!career || !career.weeks) {
        return 0;
    }

    return career.weeks.reduce((total, week) => {
        if (!week.subtopics) return total;
        return total + week.subtopics.filter(s => s.completed).length;
    }, 0);
};

export const getAllSubtopicsCount = (careers) => {
    if (!careers || careers.length === 0) {
        return { total: 0, completed: 0 };
    }

    return careers.reduce((acc, career) => {
        const total = getTotalSubtopics(career);
        const completed = getCompletedSubtopics(career);
        return {
            total: acc.total + total,
            completed: acc.completed + completed
        };
    }, { total: 0, completed: 0 });
};
