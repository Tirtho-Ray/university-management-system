export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademySemesterName = 'Autumn' | 'Summer' | 'Fall';
export type TAcademySemesterCode = '01' | '02' | '03';

export interface TAcademySemester {
  name: TAcademySemesterName;
  code: TAcademySemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
}
export  type TAcademicSemesterNameMap ={
  [key:string]:string;

}
