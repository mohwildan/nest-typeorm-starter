export interface ClaimsId {
  'x-kong-jwt-claim-user_id'?: string;
  'x-kong-jwt-claim-superadmin_id'?: string;
}
export interface CostumeHeader {
  is_superadmin?: boolean;
  costume_header?: ClaimsId;
  id?: string;
}
