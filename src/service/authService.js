import {gql, request} from "graphql-request";

export default class AuthService {
	static async checkCredentials({username, password}) {
		const query = gql`
			query MyQuery {
 				profiles(where:{username:"${username}", password: "${password}"}) {
					id
					role
					username
					password
				 }
			}
		`;

		const {profiles: profile} = await request(process.env.REACT_APP_DB_ENDPOINT, query);
		return profile.length;
	}
}