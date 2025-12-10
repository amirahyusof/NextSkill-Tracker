// Streak Calculator Utilities

export const calculateStreak = (streakData) => {
    if (!streakData || !streakData.history || streakData.history.length === 0) {
        return 0;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedDates = streakData.history
        .map(dateStr => {
            const date = new Date(dateStr);
            date.setHours(0, 0, 0, 0);
            return date;
        })
        .sort((a, b) => b - a); // Sort descending

    // Check if there's activity today or yesterday
    const lastActivity = sortedDates[0];
    const daysSinceLastActivity = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));

    if (daysSinceLastActivity > 1) {
        return 0; // Streak broken
    }

    let streak = 0;
    let expectedDate = new Date(today);

    for (const activityDate of sortedDates) {
        const dayDiff = Math.floor((expectedDate - activityDate) / (1000 * 60 * 60 * 24));

        if (dayDiff === 0) {
            streak++;
            expectedDate.setDate(expectedDate.getDate() - 1);
        } else if (dayDiff === 1) {
            streak++;
            expectedDate = new Date(activityDate);
            expectedDate.setDate(expectedDate.getDate() - 1);
        } else {
            break; // Streak broken
        }
    }

    return streak;
};

export const updateStreakOnActivity = (currentStreak) => {
    const today = new Date().toISOString().split('T')[0];

    if (!currentStreak) {
        return {
            current: 1,
            lastActivity: today,
            history: [today]
        };
    }

    const history = currentStreak.history || [];

    // Check if already logged today
    if (history.includes(today)) {
        return currentStreak;
    }

    const newHistory = [...history, today];
    const newCurrent = calculateStreak({ history: newHistory });

    return {
        current: newCurrent,
        lastActivity: today,
        history: newHistory
    };
};

export const getStreakStatus = (streak) => {
    if (!streak || streak.current === 0) {
        return { status: 'inactive', message: 'Start your streak today!' };
    }

    if (streak.current === 1) {
        return { status: 'started', message: '1 day streak - keep going!' };
    }

    if (streak.current >= 7 && streak.current < 30) {
        return { status: 'good', message: `${streak.current} days - Great consistency!` };
    }

    if (streak.current >= 30) {
        return { status: 'excellent', message: `${streak.current} days - Amazing dedication!` };
    }

    return { status: 'active', message: `${streak.current} days streak` };
};
