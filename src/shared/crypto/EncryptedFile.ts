import { Base64 } from "shared/Base64.ts";
import { EncryptedDocumentVersion } from "./EncryptedDocumentVersion.ts";
import { EncryptionAlgorithm } from "./EncryptionAlgorithm.ts";
import { TypeHelper } from "michi-typehelper";
import { AesGcm } from "./AesGcm.ts";

export class EncryptedFile {
	public readonly version: EncryptedDocumentVersion;
	public readonly algorithm: EncryptionAlgorithm;
	public readonly passwordIterations: number;
	public readonly salt: Uint8Array;
	public readonly initializationVector: Uint8Array;
	public readonly content: Uint8Array;

	public constructor(data: any) {
		TypeHelper.throwIfNullable(data);
		TypeHelper.throwIfNotType(data.version, EncryptedDocumentVersion);
		TypeHelper.throwIfNotType(data.algorithm, EncryptionAlgorithm);

		this.version = data.version;
		this.algorithm = data.algorithm;

		TypeHelper.throwIfNotType(data.passwordIterations, "number");
		TypeHelper.throwIfNotType(data.salt, "string");
		TypeHelper.throwIfNotType(data.initializationVector, "string");
		TypeHelper.throwIfNotType(data.content, "string");

		this.passwordIterations = data.passwordIterations;
		this.salt = Base64.toUint8Array(data.salt);
		this.initializationVector = Base64.toUint8Array(data.initializationVector);
		this.content = Base64.toUint8Array(data.content);
	}

	public async decrypt(password: string) {
		return await AesGcm.decrypt(this.content, password, this.passwordIterations, this.initializationVector);
	}
}
