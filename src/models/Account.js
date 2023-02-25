export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
    this.github = data.github || null
    this.linkedin = data.linkedin || null
    this.resume = data.resume || null
    this.class = data.class || null
    this.graduated = data.graduated || null
  }
}
