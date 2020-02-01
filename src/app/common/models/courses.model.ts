export class Courses {
  id?: string;
  name: string;
  date: string;
  length: string;
  description: string;
  isTopRated: boolean;
  authors?: { id: string, name: string }[];
}
