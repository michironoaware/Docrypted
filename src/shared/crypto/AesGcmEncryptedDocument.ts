export class AesGcmEncryptedDocument {
	public readonly salt: Uint8Array;
	public readonly initializationVector: Uint8Array;
	public readonly content: Uint8Array;

	public constructor(salt: Uint8Array, initializationVector: Uint8Array, content: Uint8Array) {
		this.salt = salt;
		this.initializationVector = initializationVector;
		this.content = content;
	}
}
