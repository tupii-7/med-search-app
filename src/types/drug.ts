export type DrugLabel = {
  id?: string;
  openfda?: {
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
    product_type?: string[];
    route?: string[];
  };
  description?: string[];
  indications_and_usage?: string[];
  dosage_and_administration?: string[];
  adverse_reactions?: string[];
  warnings?: string[];
  contraindications?: string[];
  drug_interactions?: string[];
};

export type OpenFdaResponse = {
  results?: DrugLabel[];
  error?: {
    message?: string;
  };
};
