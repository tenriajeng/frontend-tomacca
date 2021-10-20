import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../view/home/homePage/HomePage";

function LandingUser(props) {
	return (
		<>
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route path="/courses">
					<HomePage />
				</Route>
			</Switch>
		</>
	);
}

export default LandingUser;
