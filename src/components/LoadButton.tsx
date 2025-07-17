import { useState } from "react";
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

export default function LoadButton() {
	return (
		<Dialog>
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
							className={"w-full"}
							icon={<AddCircleRegular />}
							secondaryContent={
								"Drag and drop or browse to choose the file you want " +
								"to encrypt or decrypt. The file stays on your device."
							}
						>
							Select file
						</CompoundButton>
					</DialogContent>
				</DialogBody>
			</DialogSurface>
		</Dialog>
	);
}
