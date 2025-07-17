import { Button } from "@fluentui/react-components";
import { DarkThemeRegular } from "@fluentui/react-icons";

export default function Header() {
	return (
		<div
			className={"flex flex-row justify-between px-16 py-4 max-md:px-8 transition:padding duration-600 ease-out"}
		>
			<div className={"flex flex-row gap-2"}>
				<h1 className={"content-center text-lg"}>Docrypted</h1>
			</div>
			<div className={"flex flex-row gap-2"}>
				<Button appearance={"subtle"} icon={<DarkThemeRegular />}></Button>
			</div>
		</div>
	);
}
