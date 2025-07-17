import "./App.css";
import {
	FluentProvider,
	webLightTheme,
	Theme
} from "@fluentui/react-components";
import { useId } from "react";

const customWebLightTheme: Theme = {
	...webLightTheme,
	fontFamilyBase: "\"Rubik\", sans-serif",
}

export default function App()
{
	const encryptionAlgorithmDropdownId = useId();

	return <>
		<FluentProvider theme={customWebLightTheme}>
		</FluentProvider>
	</>;
}