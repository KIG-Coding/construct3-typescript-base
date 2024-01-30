import { App } from "./App";
var app:App;
runOnStartup(async runtime =>{
	app = new App(runtime)
});
