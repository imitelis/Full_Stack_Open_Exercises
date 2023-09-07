import express from 'express';

const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { isArrayOfNumbers, calculateExercises } from './exercisesCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { height, weight } = req.query;
  const heightValue = Number(height);
  const weightValue = Number(weight);
  
  if (!isNaN(Number(heightValue)) && !isNaN(Number(weightValue))) {
    res.json({ height: heightValue, weight: weightValue, bmi: calculateBmi(heightValue, weightValue) });   
  } else {
    res.json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { target, daily_exercises } = req.body;
  const targetValue = Number(target);
  const dailyExercisesValue: number[] = daily_exercises as number[];

  if (!isNaN(Number(targetValue)) && isArrayOfNumbers(dailyExercisesValue)) {
    const result = calculateExercises(targetValue, dailyExercisesValue);
    res.send({ result });
  } else if (!target || !daily_exercises) {
    res.json({ error: 'parameters missing' });
  } else {
    res.json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});