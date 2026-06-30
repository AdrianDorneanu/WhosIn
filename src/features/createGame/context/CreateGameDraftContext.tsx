import { createContext, PropsWithChildren, useContext, useState } from "react";

import { CreateGameFormValues } from "../schemas";

interface CreateGameDraftContextValue {
	clearDraft: () => void;
	draft: CreateGameFormValues | null;
	setDraft: (draft: CreateGameFormValues) => void;
}

const CreateGameDraftContext = createContext<CreateGameDraftContextValue | undefined>(undefined);

export function CreateGameDraftProvider({ children }: PropsWithChildren) {
	const [draft, setDraft] = useState<CreateGameFormValues | null>(null);

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
