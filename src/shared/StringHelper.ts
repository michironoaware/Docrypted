export namespace StringHelper {
	const whitespaceChars = " \t\n\r\v\f";

	export function isWhiteSpace(str: string) {
		if (str.length === 0) return true;

		for (const char of str) if ((c) => !whitespaceChars.includes(c)) return false;

		return true;
	}
}
