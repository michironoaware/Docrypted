import { EncryptedDocumentVersion } from "./EncryptedDocumentVersion.ts";
import { EncryptionAlgorithm } from "./EncryptionAlgorithm.ts";

export interface IEncryptedFileData {
	readonly version: EncryptedDocumentVersion;
	readonly algorithm: EncryptionAlgorithm;
	readonly passwordIterations: number;
	readonly salt: string;
	readonly initializationVector: string;
	readonly content: string;
}
