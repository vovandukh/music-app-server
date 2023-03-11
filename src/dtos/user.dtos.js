
class UserDTO {
    _id;
    firstName;
    lastName;
    displayName;
    avatarURL;
    location;
    email;
    role
    constructor(data) {
        this._id = data._id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.displayName = data.displayName;
        this.avatarURL = data.avatarURL;
        this.location = data.location;
        this.email = data.email;
        this.role = data.role;
    }
}

module.exports = UserDTO;