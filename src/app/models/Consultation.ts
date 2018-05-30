import {Company} from "./Company";
/**
 * Created by i.tankoua on 28/04/2016.
 */

export interface ConsultationCategory {
  id : string
  mandatory : [ConsultationElementCategory]
  optional : [ConsultationElementCategory]
}

export interface DocumentCategory {
  id : string
  name : string
}

export interface  Document {
  id : string
  name : string
  category : DocumentCategory
}
/*
 Un appel d'offre
 */
export interface Consultation {
  id : string
  status : string
  suppliers : [Company]
  category : ConsultationCategory
  elements : [ConsultationItem]
  documents : [Document]
}

/*
 une ligne dans un devis
 */
export interface  ConsultationItem {
  id: string;    // eezez
  category: ConsultationElementCategory;
  quantity: number;
  price: number;
  currency: string;
  name: string;
  groupName: string;
}

/*
 Category de l'element dans le devis
 Ex : Main d'oeuvre
 */
export interface  ConsultationElementCategory {
  id: string;
  name: string;
  unit: Unit;
  subCategories: [ConsultationElementCategory];
}

/*
 Sous category de l'element dans le devis
 Ex : Une journée de maintenance 8h
 */
export interface  Unit {
  id: string;
  name: string;
}

export interface  Up2File {
  id: string;
  name: string;
}
