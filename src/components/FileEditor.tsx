import { Button, Textarea } from "@fluentui/react-components";
import SaveButton from "./SaveButton.tsx";
import LoadButton from "./LoadButton.tsx";

export default function FileEditor() {
	return (
		<div className={"flex flex-col gap-2"}>
			<div className={"flex flex-row justify-between"}>
				<div className={"flex flex-row gap-2"}></div>
				<div className={"flex flex-row gap-2"}>
					<LoadButton />
					<SaveButton />
				</div>
			</div>
			<Textarea textarea={{ className: "!max-h-full" }} size={"large"} resize={"both"}></Textarea>
		</div>
	);
}
