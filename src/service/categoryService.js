import {gql, request} from "graphql-request";

export default class CategoryService {
	static async getCategories() {
		const query = gql`
			query {
			  categories {
				id,
				title,
				description,
				image {
				  id,
				  url
				}
			  }
			}
		`;

		const {categories} = await request(process.env.REACT_APP_DB_ENDPOINT, query);
		return categories;
	}

	static async updateCategory(data) {
		const query = gql`
			mutation {
				updateCategory(
					where: { id: "${data.id}" }
					data: {
						title: "${data.title}"
					  	description: "${data.description}"
					  	image: {
							connect:{
							   id: "${data.image}"
							}
					  	}
					}
				){
					id
				}
			}`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}

	static async createCategory(data) {
		const image = data.image || process.env.REACT_APP_IMG_PLACEHOLDER_ID;

		const query = gql`
			mutation {
			  createCategory(
				data: {
				  title: "${data.title}"
				  description: "${data.description}"
				  image: {
					connect:{
					   id: "${image}"
					}
				  }
				}
				)  {
				  id
				} 
			}`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}

	static async removeCategory(id) {
		const query = gql`
			mutation {
			  deleteCategory(where: { id: "${id}" }) {
				id
			  }
			}
		`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}
}