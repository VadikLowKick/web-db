export function filterWithPreset(users, preset) {
    return users.filter(user => {

        const userAge = parseInt(user.age, 10);
        const userHeight = parseInt(user.height, 10);
        const userWeight = parseInt(user.weight, 10);
        const userRating = parseFloat(user.avg_rating);
        
        
        const ageInRange = (!preset.minAge && preset.minAge !== 0 || userAge >= preset.minAge) && 
                           (!preset.maxAge && preset.maxAge !== 0 || userAge <= preset.maxAge);
        const heightInRange = (!preset.minHeight && preset.minHeight !== 0 || userHeight >= preset.minHeight) && 
                              (!preset.maxHeight && preset.maxHeight !== 0 || userHeight <= preset.maxHeight);
        const weightInRange = (!preset.minWeight && preset.minWeight !== 0 || userWeight >= preset.minWeight) && 
                              (!preset.maxWeight && preset.maxWeight !== 0 || userWeight <= preset.maxWeight);
        const ratingInRange = (!preset.minRating && preset.minRating !== 0 || userRating >= preset.minRating) && 
                              (!preset.maxRating && preset.maxRating !== 0 || userRating <= preset.maxRating);
        const genderMatch = preset.gender === null || user.gender === preset.gender;
        const zodiacMatch = preset.zodiac === null || user.zodiac === preset.zodiac;


        const hiddenMatch = preset.IsHidden === null || user.IsHidden === preset.IsHidden;


        return ageInRange && heightInRange && weightInRange && ratingInRange && genderMatch && zodiacMatch && hiddenMatch;
    });
}
