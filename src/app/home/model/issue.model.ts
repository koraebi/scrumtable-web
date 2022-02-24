import { Moscow } from '../enum/moscow.enum';

interface Assignee {
  login: string;
  avatar_url: string;
}

export class Issue {
  readonly number: number;
  readonly name: string;
  readonly description: string;
  readonly assignee: Assignee;
  readonly assignees: Assignee[];
  selected: boolean = false;
  details: boolean = false;
  moscow?: Moscow;
  splitPart?: 'A' | 'B';

  constructor(
    number: number,
    name: string,
    description: string,
    assignee: Assignee,
    assignees: Assignee[],
    selected?: boolean,
    moscow?: Moscow
  ) {
    this.number = number;
    this.name = name;
    this.assignee = assignee;
    this.assignees = assignees;
    this.description = description;
    if (selected) this.selected = selected;
    this.moscow = moscow;
  }
}
