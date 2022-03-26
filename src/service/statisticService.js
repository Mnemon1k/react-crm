import {gql, request} from "graphql-request";

export default class StatisticService {
	static async getCounts() {
		const query = gql`
			query {
			  productsConnection{
				aggregate{
				  count
				}
			  },
			  profilesConnection{
				aggregate{
				  count
				}
			  },
			  ordersConnection{
				aggregate{
				  count
				}
			  }
			}
		`;

		const data = await request(process.env.REACT_APP_DB_ENDPOINT, query);
		return {
			products: data.productsConnection.aggregate.count,
			profiles: data.profilesConnection.aggregate.count,
			orders: data.ordersConnection.aggregate.count,
		};
	}

	static async getLastProducts(num = 6) {
		const query = gql`
			query {
				products(last: ${num}){
					id
					title
					description
					price
					image{
						url
					}
				  }
			}
		`;

		const {products} = await request(process.env.REACT_APP_DB_ENDPOINT, query);
		return products.reverse();
	}
}