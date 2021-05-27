export default {
  setOrgContact: (state, contact) => state.orgContact = contact,
  setOrganization: (state, organization) => state.organizations = organization,
  removeOrganization: (state, id) => state.organizations = state.organizations.filter(org => org.id != id),
  SameSectors: (state, sectors) => state.sectors = sectors,
  saveOrg(state, payload) {
    state.organizations.push(payload)
  }
}
