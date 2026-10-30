import { createContext, PropsWithChildren, useContext, useState } from "react";
import { usePathname } from "expo-router";
import { useAuthStore } from "@/stores";

import { CreateGameFormValues } from "../schemas";

interface CreateGameDraftContextValue {
	clearDraft: () => void;
	draft: CreateGameFormValues | null;
	setDraft: (draft: CreateGameFormValues) => void;
}

const CreateGameDraftContext = createContext<CreateGameDraftContextValue | undefined>(undefined);
const draftRoutes = new Set(["/create-game", "/review-game", "/account-required", "/login", "/signup"]);

export function CreateGameDraftProvider({ children }: PropsWithChildren) {
	const [draft, setDraft] = useState<CreateGameFormValues | null>(null);
	const pathname = usePathname();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const [previousFlow, setPreviousFlow] = useState({ pathname, isAuthenticated });

	if (previousFlow.pathname !== pathname || previousFlow.isAuthenticated !== isAuthenticated) {
		setPreviousFlow({ pathname, isAuthenticated });
		if (!draftRoutes.has(pathname) || (previousFlow.isAuthenticated && !isAuthenticated)) {
			setDraft(null);
		}
	}

	function clearDraft() {
		setDraft(null);
	}

	return (
		<CreateGameDraftContext.Provider value={{ clearDraft, draft, setDraft }}>
			{children}
		</CreateGameDraftContext.Provider>
	);
}

export function useCreateGameDraft() {
	const context = useContext(CreateGameDraftContext);

	if (!context) {
		throw new Error("useCreateGameDraft must be used inside CreateGameDraftProvider");
	}

	return context;
}
