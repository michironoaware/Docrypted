import { ChangeEvent, useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogSurface,
	DialogTitle,
	DialogBody,
	DialogActions,
	DialogContent,
	Button,
	Field,
	Input,
	InfoLabel,
	Select,
	List,
	ListItem,
	SelectOnChangeData,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import * as React_2 from "react";
import { InputOnChangeData } from "@fluentui/react-input";
import { EncryptionAlgorithm } from "../shared/crypto/EncryptionAlgorithm.ts";

export default function SaveButton(props: ISaveButtonProps) {
	const fileNameInputLabel = <InfoLabel info={"The name the file will be saved with."}>File name</InfoLabel>;
	const passwordInputLabel = (
		<InfoLabel
			info={"Used to encrypt and decrypt the file. " + "This password will be required to access the file later."}
		>
			Password
		</InfoLabel>
	);
	const encryptionAlgorithmInputLabel = (
		<InfoLabel
			info={
				<>
					<p>
						An encryption algorithm is a method that protects your files by converting readable information
						into unreadable code. Only someone with the correct password can decrypt and access the original
						content.
					</p>
					<List>
						<ListItem>
							AES-GCM (Advanced Encryption Standard - Galois/Counter Mode) is a widely used algorithm that
							provides strong security and also ensures that the data hasn’t been altered or tampered
							with.
						</ListItem>
					</List>
				</>
			}
		>
			Encryption Algorithm
		</InfoLabel>
	);
	const passwordIterationsInputLabel = (
		<InfoLabel
			info={
				<>
					<p>
						The number of hashing iterations determines how many times your password is processed to
						generate the encryption key. Higher values make it much harder for attackers to guess your
						password, but also slightly increase the time it takes to encrypt or decrypt files.
					</p>
					<List>
						<ListItem>
							Recommended: <b>150,000 iterations</b> — good balance of security and performance.
						</ListItem>
						<ListItem>
							Faster: <b>100,000 iterations</b> — quicker on older devices.
						</ListItem>
						<ListItem>
							Very strong: <b>300,000 iterations+</b> — maximizes security with a noticeable performance
							cost.
						</ListItem>
					</List>
				</>
			}
		>
			Password hashing iterations
		</InfoLabel>
	);

	return (
		<Dialog>
			<DialogTrigger disableButtonEnhancement>
				<Button appearance={"primary"}>Save</Button>
			</DialogTrigger>
			<DialogSurface>
				<DialogBody>
					<DialogTitle
						action={
							<DialogTrigger action="close">
								<Button appearance="subtle" aria-label="close" icon={<Dismiss24Regular />} />
							</DialogTrigger>
						}
					>
						Save file
					</DialogTitle>
					<DialogContent>
						<div className={"flex flex-col gap-4 mb-4"}>
							<Field
								label={fileNameInputLabel}
								validationMessage={props.fileNameValidationMessage}
								required
							>
								<Input value={props.fileName} onChange={props.onFileNameChange}></Input>
							</Field>
							<Field
								label={passwordInputLabel}
								validationMessage={props.passwordValidationMessage}
								required
							>
								<Input
									type={"password"}
									value={props.password}
									onChange={props.onPasswordChange}
								></Input>
							</Field>
							<Field label={encryptionAlgorithmInputLabel} required>
								<Select onChange={props.onEncryptionAlgorithmChange}>
									<option value={EncryptionAlgorithm.AesGcm}>AES-GCM</option>
								</Select>
							</Field>
							<Field
								label={passwordIterationsInputLabel}
								validationMessage={props.passwordIterationsValidationMessage}
								required
							>
								<Input
									type={"number"}
									defaultValue={"150000"}
									onChange={props.onPasswordIterationsChange}
								></Input>
							</Field>
						</div>
					</DialogContent>
					<DialogActions>
						<Button appearance="primary" onClick={props.onSave}>
							Save
						</Button>
					</DialogActions>
				</DialogBody>
			</DialogSurface>
		</Dialog>
	);
}

export interface ISaveButtonProps {
	fileName: string;
	password: string;
	fileNameValidationMessage: string;
	passwordValidationMessage: string;
	passwordIterationsValidationMessage: string;
	onFileNameChange: (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
	onPasswordChange: (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
	onEncryptionAlgorithmChange: (ev: ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) => void;
	onPasswordIterationsChange: (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
	onSave: () => void;
}
