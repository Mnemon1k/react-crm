import {gql, request} from "graphql-request";

export default class ProductService {
	static async getProducts() {
		const query = gql`
			query {
			  products {
				id,
				title,
				sku,
				description,
				price,
				in_stock,
				stock_reserve,
				category {
				  id,
				  title
				},
				image {
				  id,
				  url
				}
			  }
			}
		`;

		const {products} = await request(process.env.REACT_APP_DB_ENDPOINT, query);
		return products;
	}

	static async updateProduct(data) {
		const query = gql`
			mutation {
				updateProduct(
					where: { id: "${data.id}" }
					data: {
						title: "${data.title}"
					  	sku: "${data.sku}"
					  	description: "${data.description}"
					  	price: ${data.price}
					  	category: {
							connect: {
							  id: "${data.category}"
							}
					  	}
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

	static async updateStock(data) {
		const query = gql`
			mutation {
				updateProduct(
					where: { id: "${data.id}" }
					data: {
						in_stock: "${data.in_stock}"
					}
				){
					id
				}
			}`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}

	static async updateReserve(data) {
		const query = gql`
			mutation {
				updateProduct(
					where: { id: "${data.id}" }
					data: {
						stock_reserve: "${data.stock_reserve}"
					}
				){
					id
				}
			}`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}

	static async createProduct(data) {
		const image = data.image || process.env.REACT_APP_IMG_PLACEHOLDER_ID;

		const query = gql`
			mutation {
			  createProduct(
				data: {
				  title: "${data.title}"
				  sku: "${data.sku}"
				  description: "${data.description}"
				  price: ${data.price}
				  in_stock: 0
				  stock_reserve: 0
				  category: {
					connect: {
					  id: "${data.category}"
					}
				  }
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

	static async removeProduct(id) {
		const query = gql`
			mutation {
			  deleteProduct(where: { id: "${id}" }) {
				id
			  }
			}
		`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}
}