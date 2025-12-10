import { useLocalStorage } from './useLocalStorage';
import { calculateStreak, updateStreakOnActivity } from '../utils/streakCalculator';

export const useStreak = () => {
    const [streakData, setStreakData] = useLocalStorage('learningStreak', {
        current: 0,
        lastActivity: null,
        history: []
    });

    const recordActivity = () => {
        const updatedStreak = updateStreakOnActivity(streakData);
        setStreakData(updatedStreak);
        return updatedStreak.current;
    };

    const getCurrentStreak = () => {
        return calculateStreak(streakData);
    };

    return {
        streak: streakData,
        currentStreak: getCurrentStreak(),
        recordActivity
    };
};
