import { useLocalStorage } from './useLocalStorage';
import { getEarnedBadges, getAllBadgesWithStatus } from '../utils/badgeSystem';

export const useBadges = (stats) => {
    const [earnedBadges, setEarnedBadges] = useLocalStorage('earnedBadges', []);

    const checkAndAwardBadges = () => {
        const newBadges = getEarnedBadges(stats, earnedBadges);

        if (newBadges.length > 0) {
            setEarnedBadges([...earnedBadges, ...newBadges]);
            return newBadges;
        }

        return [];
    };

    const allBadges = getAllBadgesWithStatus(stats, earnedBadges);

    return {
        earnedBadges,
        allBadges,
        checkAndAwardBadges
    };
};
