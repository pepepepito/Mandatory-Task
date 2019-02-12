export const avgTemp = [14, 13, 14, 16, 19, 25, 29, 29, 27, 21, 17, 17];
export const minTemp = [11, 10, 11, 13, 16, 21, 24, 25, 23, 17, 14, 14];
export const maxTemp = [17, 16, 17, 19, 23, 27, 31, 31, 28, 23, 19, 19];
export const month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
export interface TempStat {
  id: string;
  name: string;
  values: number[];
  month: String[]
}

export const malagaStats: TempStat[] = [
  {
    id: "avg",
    name: "Average Temp",
    values: [14, 13, 14, 16, 19, 25, 29, 29, 27, 21, 17, 17],
    month: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
  }
  ,
  {
    id: "min",
    name: "Min Temp",
    values: [11, 10, 11, 13, 16, 21, 24, 25, 23, 17, 14, 14],
    month: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
  },
  {
    id: "max",
    name: "Max Temp",
    values: [17, 16, 17, 19, 23, 27, 31, 31, 28, 23, 19, 19],
    month: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
  }
];