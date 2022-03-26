import {gql, request} from "graphql-request";
import objToStr from "../utils/objToStr";

export default class OrderService {
	static async getOrders() {
		const query = gql`
			query {
				orders {
					id,
					clientName,
					clientSurname,
					deliveryAddress,
					price,
					comment,
					deliveryType,
					createdAt,
					updatedAt,
					profile {
						id,
						username
					},
					products {
						id,
						title,
						sku,
						description,
						price,
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
			}
		`;

		const {orders} = await request(process.env.REACT_APP_DB_ENDPOINT, query);
		return orders;
	}

	static async createOrder(data) {
		let products = data.products.map(item => objToStr(item));

		const query = gql`
			mutation {
			  createOrder(
				data: {
				  clientName: "${data.clientName}"
				  clientSurname: "${data.clientSurname}"
				  deliveryAddress: "${data.deliveryAddress}"
				  price: ${data.price}
				  comment: "${data.comment}"
				  deliveryType: ${data.deliveryType}
				  products: {
					connect: [
						${products.join(',')}
					]
				  }
				})  {
				  id
				} 
			}`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}

	static async removeOrder(id) {
		const query = gql`
			mutation {
			  deleteOrder(where: { id: "${id}" }) {
				id
			  }
			}
		`;

		await request(process.env.REACT_APP_DB_ENDPOINT, query);
	}
}