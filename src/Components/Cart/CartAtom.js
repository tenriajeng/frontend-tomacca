import { atom } from "recoil";

export const CartAtom = atom({
	key: "cartAtom", // * unique Key (with respect to other atoms/selectors)
	default: { onClose: false, visible: false }, // * default value (aka initial value)
});

export const CartCountAtom = atom({
	key: "cartCountAtom", // * unique Key (with respect to other atoms/selectors)
	default: null, // * default value (aka initial value)
});
