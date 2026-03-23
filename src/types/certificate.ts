export interface ExtractedData {
  studentName?: string;
  semester?: string;
  sgpa?: string;
  cgpa?: string;
  rollNumber?: string;
  issueDate?: string;
  [key: string]: string | undefined;
}