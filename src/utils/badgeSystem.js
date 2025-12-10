// Badge System Utilities

export const BADGES = [
    {
        id: 'first-steps',
        name: 'First Steps',
        description: 'Complete your first subtopic',
        icon: '🎯',
        requirement: { type: 'subtopics', count: 1 }
    },
    {
        id: 'getting-started',
        name: 'Getting Started',
        description: 'Complete 10 subtopics',
        icon: '⭐',
        requirement: { type: 'subtopics', count: 10 }
    },
    {
        id: 'dedicated-learner',
        name: 'Dedicated Learner',
        description: 'Maintain a 7-day learning streak',
        icon: '🔥',
        requirement: { type: 'streak', count: 7 }
    },
    {
        id: 'unstoppable',
        name: 'Unstoppable',
        description: 'Maintain a 30-day learning streak',
        icon: '💪',
        requirement: { type: 'streak', count: 30 }
    },
    {
        id: 'career-starter',
        name: 'Career Starter',
        description: 'Complete your first career (100%)',
        icon: '🎓',
        requirement: { type: 'career', count: 1 }
    },
    {
        id: 'multi-tasker',
        name: 'Multi-tasker',
        description: 'Have 3 active careers',
        icon: '🎪',
        requirement: { type: 'active-careers', count: 3 }
    },
    {
        id: 'half-century',
        name: 'Half Century',
        description: 'Complete 50 subtopics',
        icon: '🏆',
        requirement: { type: 'subtopics', count: 50 }
    },
    {
        id: 'century',
        name: 'Century',
        description: 'Complete 100 subtopics',
        icon: '👑',
        requirement: { type: 'subtopics', count: 100 }
    }
];

export const checkBadgeEarned = (badge, stats) => {
    const { type, count } = badge.requirement;

    switch (type) {
        case 'subtopics':
            return stats.completedSubtopics >= count;

        case 'streak':
            return stats.currentStreak >= count;

        case 'career':
            return stats.completedCareers >= count;

        case 'active-careers':
            return stats.activeCareers >= count;

        default:
            return false;
    }
};

export const getEarnedBadges = (stats, existingBadges = []) => {
    const earnedBadges = [];

    BADGES.forEach(badge => {
        const alreadyEarned = existingBadges.find(b => b.id === badge.id);

        if (!alreadyEarned && checkBadgeEarned(badge, stats)) {
            earnedBadges.push({
                ...badge,
                earnedAt: new Date().toISOString()
            });
        }
    });

    return earnedBadges;
};

export const getAllBadgesWithStatus = (stats, earnedBadges = []) => {
    return BADGES.map(badge => {
        const earned = earnedBadges.find(b => b.id === badge.id);
        return {
            ...badge,
            earned: !!earned,
            earnedAt: earned?.earnedAt || null,
            progress: getBadgeProgress(badge, stats)
        };
    });
};

const getBadgeProgress = (badge, stats) => {
    const { type, count } = badge.requirement;
    let current = 0;

    switch (type) {
        case 'subtopics':
            current = stats.completedSubtopics;
            break;
        case 'streak':
            current = stats.currentStreak;
            break;
        case 'career':
            current = stats.completedCareers;
            break;
        case 'active-careers':
            current = stats.activeCareers;
            break;
        default:
            current = 0;
    }

    return Math.min(Math.round((current / count) * 100), 100);
};
