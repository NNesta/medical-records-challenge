import { resolve, dirname } from 'path';
import xlsx from 'xlsx';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Service {
	static async PatientData() {
		try {
			const filePath = resolve(__dirname, 'Medical Data.xlsx');
			const workbook = xlsx.readFile(filePath);
			const sheetNames = workbook.SheetNames;

			// Fetch data from "Sheet0"
			const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
			return data;
		} catch (err) {
			return err;
		}
	}
	static async PharmacyData() {
		try {
			const filePath = resolve(__dirname, 'Medical Data.xlsx');
			const workbook = xlsx.readFile(filePath);
			const sheetNames = workbook.SheetNames;

			// Fetch data from "Sheet1"
			const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[1]]);
			return data;
		} catch (err) {
			return err;
		}
	}
	static async PhysicianData() {
		try {
			const filePath = resolve(__dirname, 'Medical Data.xlsx');
			const workbook = xlsx.readFile(filePath);
			const sheetNames = workbook.SheetNames;

			// Fetch data from "Sheet2"
			const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[2]]);

			return data;
		} catch (err) {
			return err;
		}
	}
	static async Admin() {
		try {
			const filePath = resolve(__dirname, 'Medical Data.xlsx');
			const workbook = xlsx.readFile(filePath);
			const sheetNames = workbook.SheetNames;

			// Fetch all data
			const PatientData = xlsx.utils.sheet_to_json(
				workbook.Sheets[sheetNames[0]]
			);
			const PharmacyData = xlsx.utils.sheet_to_json(
				workbook.Sheets[sheetNames[1]]
			);
			const PhysicianData = xlsx.utils.sheet_to_json(
				workbook.Sheets[sheetNames[2]]
			);
			const data = {
				PatientData,
				PharmacyData,
				PhysicianData,
			};
			return data;
		} catch (err) {
			return err;
		}
	}
}
