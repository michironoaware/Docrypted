import { FluentProvider, webLightTheme, webDarkTheme, Theme } from "@fluentui/react-components";
import FileEditor from "./components/FileEditor.tsx";
import Header from "./components/Header.tsx";
import { useState } from "react";

const customWebLightTheme: Theme = {
	...webLightTheme,
	fontFamilyBase: '"Rubik", sans-serif',
};

const customWebDarkTheme: Theme = {
	...webDarkTheme,
	fontFamilyBase: '"Rubik", sans-serif',
};

export default function App() {
	const [theme, setTheme] = useState<Theme>(customWebLightTheme);

	function onThemeButtonClick() {
		if (theme === customWebLightTheme) {
			setTheme(customWebDarkTheme);
			return;
		}

		setTheme(customWebLightTheme);
	}

	return (
		<FluentProvider theme={theme}>
			<div className={"flex flex-col w-dvw h-dvh"}>
				<Header onThemeButtonClick={onThemeButtonClick} />
				<div
					className={
						"px-64 py-16 max-2xl:px-48 max-2xl:py-12 max-xl:px-32 max-xl:py-8" +
						" " +
						"transition:padding duration-600 ease-out box-border"
					}
				>
					<FileEditor />
				</div>
			</div>
		</FluentProvider>
	);
}
