import "./App.css";
import { FluentProvider, webLightTheme, Theme } from "@fluentui/react-components";

const customWebLightTheme: Theme = {
	...webLightTheme,
	fontFamilyBase: '"Rubik", sans-serif',
};

export default function App() {
	return (
		<>
			<FluentProvider theme={customWebLightTheme}></FluentProvider>
		</>
	);
}
