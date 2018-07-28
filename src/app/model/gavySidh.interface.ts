export interface GavySidhRecords{
  name?: string,
  mobileNo?: string,
  email?: string,
  password?:string,
  img?: string,
  address?: {
    state?: string,
    city?: string,
    locality?: string,
    pincode?: string
  },
  gender?: string,
  workingArea?: string,
  isFullTime?: boolean,
  profession?: string,
  showDetails?: boolean,
  isGavyasidh?: boolean,
  isAdmin?: boolean,
  isProfileComplete?: boolean,
  isChecked?: boolean,
  isSuperAdmin?: boolean,
  isGauchikitshak?:boolean
}