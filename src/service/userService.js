import {gql, request} from "graphql-request";

export default class UserService {
	static async getUsers() {
		const query = gql`
			query MyQuery {
			  profiles {
				id
				role
				username
				password
			  }
			}
		`;

		const {profiles} = await request(process.env.REACT_APP_DB_ENDPOINT, query);
		return profiles;
	}

	static async updateUser(data) {
		const query = gql`
			mutation {
				updateProfile(
					where: { id: "${data.id}" }
					data: {
						username: "${data.username}"
						password: "${data.password}"
						role: ${data.role}
					}
				){
					id
				}
			}`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}

	static async createUser(data) {
		const query = gql`
			mutation {
				createProfile(
				  data: {
					username: "${data.username}"
					password: "${data.password}"
					role: ${data.role}
				  }
				)  {
					id
				} 
			}`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}

	static async removeUser(id) {
		const query = gql`
			mutation {
			  deleteProfile(where: { id: "${id}" }) {
				username
			  }
			}
		`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}
}