import { Moscow } from '../enum/moscow.enum';

interface Assignee {
  login: string;
  avatar_url: string;
}

interface Labels {
  name: string;
  description: string;
  color: string;
}

export class Issue {
  readonly number: number;
  readonly name: string;
  readonly description: string;
  readonly assignee: Assignee;
  readonly assignees: Assignee[];
  readonly labels: Labels[];
  selected: boolean = false;
  details: boolean = false;
  side : string = "left";
  moscow?: Moscow;

  constructor(
    number: number,
    name: string,
    description: string,
    assignee: Assignee,
    assignees: Assignee[],
    labels: Labels[],
    selected?: boolean,
    moscow?: Moscow
  ) {
    this.number = number;
    this.name = name;
    this.assignee = assignee;
    this.assignees = assignees;
    this.description = description;
    this.labels = labels;
    if (selected) this.selected = selected;
    this.moscow = moscow;
  }
}
