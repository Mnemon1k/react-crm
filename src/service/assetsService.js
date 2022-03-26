import {gql, request} from "graphql-request";

export default class AssetsService {
	static async getAssetLinkByTitle(title) {
		const query = gql`
			query {
			  assets(where:{fileName:"${title}"},last:1) {
				id,
				url
			  }
			}
		`;

		const {assets} = await request(process.env.REACT_APP_DB_ENDPOINT, query);
		return assets.length ? assets[0] : null;
	}

	static async uploadImage(event) {
		const formData = new FormData()
		formData.append('fileUpload', event.file)

		let response = await fetch(process.env.REACT_APP_ASSETS_ENDPOINT, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				authorization: "Bearer " + process.env.REACT_APP_PERMANENT_AUTH_TOKEN
			},
			body: formData
		});

		event.onSuccess(response, event.file);
	}

	static async getAssetLinkById(id) {
		const query = gql`
			query {
			  assets(where:{id:"${id}"}) {
				id,
				url
			  }
			}
		`;

		const {assets} = await request(process.env.REACT_APP_DB_ENDPOINT, query);
		return assets.length ? assets[0] : null;
	}
}