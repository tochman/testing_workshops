
const Contract = {
  status(status) {
    switch (status) {
      case 0:
        return 'Deployed'
      case 1:
        return 'Initieted'
      default:
        return 'Unknown'
    }
  }
}

export default  Contract

