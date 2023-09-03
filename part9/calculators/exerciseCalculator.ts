interface exerciseValues {
    value1: Array<number>;
    value2: number;
}

const calculateExercise = (numberOfDays: number, numberOfTrainingDays: number, originalTargetValue: number, calculatedAverageTime: number): Object => {
    
    return { periodLength: 7,
        trainingDays: 5,
        success: false,
        rating: 2,
        ratingDescription: 'not too bad but could be better',
        target: 2,
        average: 1.9285714285714286 
    }
  }