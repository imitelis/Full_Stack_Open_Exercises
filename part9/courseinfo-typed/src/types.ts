interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartAdvanced extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "advanced"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartAdvanced;