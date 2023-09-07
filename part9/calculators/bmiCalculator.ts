interface bmiValues {
  heightValue: number;
  weightValue: number;
}
  
const bmiArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightValue: Number(args[2]),
      weightValue: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInM = height / 100;
  const result = weight/(heightInM**2);

  if (result < 18.5) {
    return 'Underweight (low weight)';
  } else if (result >= 18.5 && result < 25) {
    return 'Healthy weight (average weight)';
  } else if (result >= 25 && result < 30) {
    return 'Overweight (moderate weight)';
  } else if (result >= 30 && result < 35) {
    return 'Obesity Class I (increased weight)';
  } else if (result >= 35 && result < 40) {
    return 'Obesity Class II (severe weight)';
  } else {
    return 'Obesity Class III (very severe weight)';
  }
};

try {
    const { heightValue, weightValue } = bmiArguments(process.argv);
    console.log(`Calculated BMI for a person with ${heightValue}cm and ${weightValue}kg, the result is:`, calculateBmi(heightValue, weightValue));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
