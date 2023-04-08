export const transformProfile = (e: any ) => {
  return {
    name: e.name,
    email: e.email,
    phone: e.phone,
    address: e.address
  }
}