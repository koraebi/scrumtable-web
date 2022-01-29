import {Issue} from "./issue.model";


export interface IContent {
  color: string;
  issues: Issue[];
}
export interface ILabel {
  [key: string] : IContent
}
