import fetch from 'node-fetch';
import { config } from 'dotenv';

//App configuration
config();

const host = process.env.HOST || 'http://localhost';

const url = `${host}:8080/java_servlet_app`;

export default class Users {
	static async getUsers(req, res) {
		try {
			const response = await fetch(`${url}/users/all`, {
				method: 'GET',
			});
			const datas = await response.json();
			return res.status(200).json({ message: datas.message, datas });
		} catch (err) {
			if (res.statusCode === 500) {
				return res
					.status(500)
					.json({ message: 'internal server error', error: err });
			}
			return res.status(400).json({ message: 'Unable to signup', error: err });
		}
	}
	static async getUser(req, res) {
		try {
			const response = await fetch(
				`${url}/users/single?email=${req.params.email}`,
				{
					method: 'GET',
				}
			);
			const datas = await response.json();
			return res
				.status(200)
				.json({ message: datas.message, data: datas.Payload });
		} catch (err) {
			if (res.statusCode === 500) {
				return res
					.status(500)
					.json({ message: 'internal server error', error: err });
			}
			return res.status(400).json({ message: 'Unable to login', error: err });
		}
	}
}
