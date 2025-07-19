import { ChangeEvent, useState } from "react";
import { Button, Textarea } from "@fluentui/react-components";
import SaveButton from "./SaveButton.tsx";
import LoadButton from "./LoadButton.tsx";
import { EncryptionAlgorithm } from "../shared/crypto/EncryptionAlgorithm.ts";
import { StringHelper } from "../shared/StringHelper.ts";
import { FileCypher } from "../shared/crypto/FileCypher.ts";

export default function FileEditor() {
	const [fileName, setFileName] = useState("Docrypted file");
	const [text, setText] = useState("");
	const [encryptionAlgorithm, setEncryptionAlgorithm] = useState(EncryptionAlgorithm.AesGcm);
	const [password, setPassword] = useState("");
	const [passwordIterations, setPasswordIterations] = useState(150_000);
	const [fileNameValidationMessage, setFileNameValidationMessage] = useState("");
	const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
	const [passwordIterationsValidationMessage, setPasswordIterationsValidationMessage] = useState("");

	function verifyFileName(fileName: string) {
		if (StringHelper.isWhiteSpace(fileName)) {
			setFileNameValidationMessage("File name must be not empty.");
			return false;
		}

		setFileNameValidationMessage();
		return true;
	}

	function verifyPassword(password: string) {
		if (StringHelper.isWhiteSpace(password)) {
			setPasswordValidationMessage("Password must be not empty.");
			return false;
		}

		setPasswordValidationMessage();
		return true;
	}

	function verifyPasswordIterations(iterations: number) {
		if (iterations < 10_000) {
			setPasswordIterationsValidationMessage("Insert a number greater than or equal to 10000");
			return false;
		}

		setPasswordIterationsValidationMessage();
		return true;
	}

	function onFileNameChange(ev: ChangeEvent<HTMLInputElement>) {
		setFileName(ev.target.value);
		verifyFileName(ev.target.value);
	}

	function onPasswordChange(ev: ChangeEvent<HTMLInputElement>) {
		setPassword(ev.target.value);
		verifyPassword(ev.target.value);
	}

	function onEncryptionAlgorithmChange(ev: ChangeEvent<HTMLSelectElement>) {
		const value = parseInt(ev.target.value, 10);
		setEncryptionAlgorithm(isNan(value) ? 0 : value);
	}

	function onPasswordIterationsChange(ev: ChangeEvent<HTMLInputElement>) {
		const value = Math.floor(isNaN(ev.target.valueAsNumber) ? 0 : ev.target.valueAsNumber);
		setPasswordIterations(value);
		verifyPasswordIterations(value);
	}

	async function onSave() {
		if (!(verifyFileName(fileName) && verifyPassword(password) && verifyPasswordIterations(passwordIterations))) {
			return;
		}

		await FileCypher.instance.saveAsAesGcm(
			new TextEncoder("utf-8").encode(text),
			password,
			fileName,
			passwordIterations,
		);
	}

	return (
		<div className={"flex flex-col gap-2"}>
			<div className={"flex flex-row justify-between"}>
				<div className={"flex flex-row gap-2"}></div>
				<div className={"flex flex-row gap-2"}>
					<LoadButton />
					<SaveButton
						fileName={fileName}
						password={password}
						fileNameValidationMessage={fileNameValidationMessage}
						passwordValidationMessage={passwordValidationMessage}
						passwordIterationsValidationMessage={passwordIterationsValidationMessage}
						onFileNameChange={onFileNameChange}
						onPasswordChange={onPasswordChange}
						onEncryptionAlgorithmChange={onEncryptionAlgorithmChange}
						onPasswordIterationsChange={onPasswordIterationsChange}
						onSave={onSave}
					/>
				</div>
			</div>
			<Textarea
				textarea={{ className: "!max-h-full" }}
				size={"large"}
				resize={"both"}
				onChange={(ev) => setText(ev.target.value)}
			></Textarea>
		</div>
	);
}
