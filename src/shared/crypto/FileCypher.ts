import { EncryptedDocumentVersion } from "./EncryptedDocumentVersion.ts";
import { EncryptionAlgorithm } from "./EncryptionAlgorithm.ts";
import { AesGcm } from "./AesGcm.ts";
import { EncryptedFile } from "./EncryptedFile.ts";
import { IEncryptedFileData } from "./IEncryptedFileData.ts";
import { Base64 } from "../Base64.ts";

export class FileCypher {
	public static readonly instance = new FileCypher();

	private constructor() {}

	public async load(file: File) {
		return new EncryptedFile(JSON.parse(await file.text()));
	}

	public async saveAsAesGcm(content: Uint8Array, password: string, filename: string, iterations: number) {
		const encryptedDoc = await AesGcm.encrypt(content, password, iterations);
		const fileData = {
			version: EncryptedDocumentVersion.V1,
			algorithm: EncryptionAlgorithm.AesGcm,
			passwordIterations: iterations,
			salt: Base64.fromUint8Array(encryptedDoc.salt),
			initializationVector: Base64.fromUint8Array(encryptedDoc.initializationVector),
			content: Base64.fromUint8Array(encryptedDoc.content),
		} satisfies IEncryptedFileData;

		const link = document.createElement("a");
		const fileBlob = new Blob([JSON.stringify(fileData)]);
		link.href = URL.createObjectURL(fileBlob);
		link.download = `${filename}.docrypted`;
		link.click();
		URL.revokeObjectURL(link.href);
	}
}
