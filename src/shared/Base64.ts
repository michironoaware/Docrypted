export namespace Base64 {
	export function toUint8Array(base64String: string) {
		const decodedString = atob(base64String);
		const bytes = new Uint8Array(decodedString.length);
		for (let i = 0; i < decodedString.length; i++) {
			bytes[i] = decodedString.charCodeAt(i);
		}

		return bytes;
	}

	export function fromUint8Array(bytes: Uint8Array) {
		const byteString = Array.from(bytes)
			.map((byte) => String.fromCharCode(byte))
			.join("");

		return btoa(byteString);
	}
}
