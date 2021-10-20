import { atom } from "recoil";

export const AuthAtom = atom({
	key: "authenticate", // * unique Key (with respect to other atoms/selectors)
	default: {
		login: false,
		token: null,
		dataUser: { response: { level: 0 } },
	}, // * default value (aka initial value)
});
