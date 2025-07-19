import { ChangeEvent, ChangeEventHandler, useId, useState } from "react";
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
	CompoundButton,
} from "@fluentui/react-components";
import { AddCircleRegular, Dismiss24Regular, DismissRegular } from "@fluentui/react-icons";
import { InputOnChangeData } from "@fluentui/react-input";

export default function LoadButton(props: ILoadButtonProps) {
	const passwordInputLabel = (
		<InfoLabel
			info={"Used to encrypt and decrypt the file. " + "This password will be required to access the file later."}
		>
			Password
		</InfoLabel>
	);

	const [dialogOpen, setDialogOpen] = useState(false);
	const buttonId = useId();
	const passwordFieldId = useId();
	const fileInputId = useId();
	const loadButtonId = useId();

	function onButtonClick() {
		const fileInput = document.getElementById(fileInputId);
		fileInput!.click();
	}

	function onFileInput(ev: ChangeEvent<HTMLInputElement>) {
		const button = document.getElementById(buttonId)!;
		const passwordField = document.getElementById(passwordFieldId)!;
		const loadButton = document.getElementById(loadButtonId)!;
		button.toggleAttribute("hidden");
		passwordField.toggleAttribute("hidden");
		loadButton.toggleAttribute("hidden");

		props.onFileInput(ev);
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={(ev, data) => setDialogOpen(data.open)}>
			<DialogTrigger disableButtonEnhancement>
				<Button appearance={"secondary"}>Load</Button>
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
						Load file
					</DialogTitle>
					<DialogContent>
						<CompoundButton
							id={buttonId}
							onClick={onButtonClick}
							className={"w-full"}
							icon={<AddCircleRegular />}
							secondaryContent={
								"Drag and drop or browse to choose the file you want " +
								"to encrypt or decrypt. The file stays on your device."
							}
						>
							Select file
						</CompoundButton>
						<Field
							id={passwordFieldId}
							label={passwordInputLabel}
							validationMessage={props.passwordValidationMessage}
							required
							hidden
						>
							<Input type={"password"} onChange={props.onPasswordChange}></Input>
						</Field>
						<input
							id={fileInputId}
							type={"file"}
							accept={".docrypted"}
							className={"absolute"}
							hidden
							onChange={onFileInput}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							id={loadButtonId}
							appearance="primary"
							onClick={async () => ((await props.onLoad()) ? setDialogOpen(false) : undefined)}
							hidden
						>
							Decrypt
						</Button>
					</DialogActions>
				</DialogBody>
			</DialogSurface>
		</Dialog>
	);
}

export interface ILoadButtonProps {
	passwordValidationMessage: string;
	onPasswordChange: (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
	onFileInput: (ev: ChangeEvent<HTMLInputElement>) => void;
	/**
	 * @returns A boolean indicating whether to close the dialog.
	 * */
	onLoad: () => Promise<boolean>;
}
