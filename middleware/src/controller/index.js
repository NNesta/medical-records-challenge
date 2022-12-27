import Services from '../services/index.js';

const { Admin, PatientData, PharmacyData, PhysicianData } = Services;

export default class MedicalController {
	static async FetchData(req, res) {
		try {
			if (req.params.id === 'ADMIN') {
				const data = await Admin();
				if (!data) return res.status(400).json({ message: 'data Not found' });
				return res
					.status(200)
					.json({ message: 'data retrived Successfully', data });
			}
			if (req.params.id === 'PATIENT') {
				const data = await PatientData();
				if (!data) return res.status(400).json({ message: 'data Not found' });

				return res
					.status(200)
					.json({ message: 'data retrived Successfully', data });
			}
			if (req.params.id === 'PHARMACIST') {
				const data = await PharmacyData();
				if (!data) return res.status(400).json({ message: 'data Not found' });

				return res
					.status(200)
					.json({ message: 'data retrived Successfully', data });
			}
			if (req.params.id === 'PHYSICIAN') {
				const data = await PhysicianData();
				if (!data) return res.status(400).json({ message: 'data Not found' });

				return res
					.status(200)
					.json({ message: 'data retrived Successfully', data });
			}
			return res.status(400).send({ message: 'please login ' });
		} catch (err) {
			return res.status(500).json({ message: 'internal server error' });
		}
	}
}
