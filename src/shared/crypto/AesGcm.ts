import { AesGcmEncryptedDocument } from "./AesGcmEncryptedDocument.ts";

export namespace AesGcm {
	export async function decrypt(
		content: Uint8Array,
		password: string,
		passwordIterations: number,
		salt: Uint8Array,
		initializationVector: Uint8Array,
	) {
		const subtle = window.crypto.subtle;

		const key = await getKey(password, passwordIterations, salt);

		let decryptedBuffer = await subtle.decrypt(
			{
				name: "AES-GCM",
				iv: initializationVector,
			},
			key.value,
			content,
		);

		return new Uint8Array(decryptedBuffer);
	}

	export async function encrypt(content: Uint8Array, password: string, passwordIterations: number) {
		const subtle = window.crypto.subtle;

		const key = await getKey(password, passwordIterations);
		const initializationVector = window.crypto.getRandomValues(new Uint8Array(12));
		const encryptedBuffer = await subtle.encrypt(
			{
				name: "AES-GCM",
				iv: initializationVector,
			},
			key.value,
			content,
		);

		return new AesGcmEncryptedDocument(key.salt, initializationVector, content);
	}

	async function getKey(password: string, iterations: number, salt?: Uint8Array) {
		const subtle = window.crypto.subtle;

		salt = salt ?? window.crypto.getRandomValues(new Uint8Array(16));

		const passwordAsUtf8 = new TextEncoder().encode(password);
		const baseKey = await subtle.importKey("raw", passwordAsUtf8, "PBKDF2", false, ["deriveKey"]);

		const key = await subtle.deriveKey(
			{
				name: "PBKDF2",
				salt: salt,
				iterations,
				hash: "SHA-256",
			},
			baseKey,
			{
				name: "AES-GCM",
				length: 256,
			},
			false,
			["encrypt", "decrypt"],
		);

		return Object.freeze({
			value: key,
			salt,
		});
	}
}
