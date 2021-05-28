

export interface DayMealsModel{
    day?: string,
    meals: {
        breakfast: string[],
        lunch: string[],
        dinner: string[]
    }
}