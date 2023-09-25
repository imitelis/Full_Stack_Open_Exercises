interface exercisesValues {
    targetValue: number;
    dailyExercisesValue: Array<number>;
}

interface exercisesCalculation {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export function isArrayOfNumbers(arr: Array<number>) {
    return Array.isArray(arr) && arr.every(item => typeof item === 'number' && !isNaN(item));
}

const exercisesArguments = (args: string[]): exercisesValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    const hoursArray = [];
    for (let i = 3; i < args.length; i++) {
        hoursArray.push(Number(args[i]));
    }

    if (!isNaN(Number(args[2])) && isArrayOfNumbers(hoursArray)) {
        return {
          targetValue: Number(args[2]),
          dailyExercisesValue: hoursArray
        };
      } else {
        throw new Error('Provided values were not numbers!');
      }
};

export const calculateExercises = (targetHours: number, hoursPerDay: Array<number>): exercisesCalculation => {
    const trainingPeriod = hoursPerDay.length;
    
    let trainedDays = 0;
    let trainedHours = 0;
    for (let i = 0; i < hoursPerDay.length; i++) {
        if (hoursPerDay[i] > 0) {
            trainedDays++;
            trainedHours += Number(hoursPerDay[i]);
        }
    }

    const averageHoursPerDay = trainedHours / (hoursPerDay.length);
    const sucessfulTraining = averageHoursPerDay >= targetHours ? true : false;

    let rated = 0;
    let ratedDescription = '';
    if (averageHoursPerDay < 1.5) {
        rated = 1;
        ratedDescription = 'disappointing, you should exercise more';
    } else if (averageHoursPerDay >= 1.5 && averageHoursPerDay < 2) {
        rated = 2;
        ratedDescription = 'not too bad, but could be better';
    } else if (averageHoursPerDay >= 2 && averageHoursPerDay < 3) {
        rated = 3;
        ratedDescription = 'great, healthy experience';
    } else if (averageHoursPerDay >= 3 && averageHoursPerDay < 5) {
        rated = 4;
        ratedDescription = 'awesome, professional performance';
    } else if (averageHoursPerDay >= 5) {
        rated = 5;
        ratedDescription = 'sick, maybe you should rest more';
    }
    
    return { 
        periodLength: trainingPeriod,
        trainingDays: trainedDays,
        success: sucessfulTraining,
        rating: rated,
        ratingDescription: ratedDescription,
        target: targetHours,
        average: averageHoursPerDay
    };
};

try {
    const { dailyExercisesValue, targetValue } = exercisesArguments(process.argv);
    console.log(`Calculated physical exercise for a person with ${targetValue} target hours per day and ${dailyExercisesValue} daily hours, the result is:`, calculateExercises(targetValue, dailyExercisesValue));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
