export interface Programmation {
  id: number;
  name: string;
  shortDescription: string;
  date: string;
  userId: string;
  nbOfUseLanding: number;
  nbOfUseInApp: number;
  schoolyearId: string;
  schoolId: string;
  programmationId: string;
  periodes: Periode[];
  matieres: Matiere[];
  columnWidth: number;
  fontSize: string; 
  view: string;
  invertedRowCol: boolean;
  niveau: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  onePageMatiere: boolean;
  slug: string;
  documentId: string;
}

export interface Periode {
  id: string;
  name: string;
  color: string;
  endDate: string;
  position: number;
  startDate: string;
  programmationId: string;
}

export interface Matiere {
  id: string;
  name: string;
  color: string;
  domaines: Domaine[];
  position: number;
  programmationId: string;
}

export interface Domaine {
  id: string;
  name: string;
  color: string;
  items: Item[];
  position: number;
  matiereId: string;
}

export interface Item {
  y: number;
  id: string;
  value: string;
  width: number;
  height: number;
  status: string;
  Sequence: null | any;
  domaineId: string;
  periodeId: string;
  FicheDePrep: null | any;
  attachments: any[];
}

export interface ProgrammationResponse {
  data: Programmation;
  meta: Record<string, any>;
}
