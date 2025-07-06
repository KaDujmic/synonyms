import { Button } from "../../../../../components/Button"
import { ClickOutsideAwareComponent } from "../../../../../features/clickOutsideAwareComponent/components/ClickOutsideAwareComponent"
import { InputField } from "../../../../../components/InputField"
import type { Synonym } from "../../../../../types/Synonym.type";

interface AddNewSynonymProps {
    handleSave: () => void;
    handleCancel: () => void;
    handleInputChange: (value: string, closeSuggestions?: boolean) => void;
    isFocused: boolean;
    setIsFocused: (isFocused: boolean) => void;
		newSynonym: string;
		searchResults: Synonym[];
}

export const AddNewSynonym = (props: AddNewSynonymProps) => {
    const {
        newSynonym,
        searchResults,
        setIsFocused,
        handleInputChange,
        handleSave,
        handleCancel,
        isFocused,
    } = props;

    return (
        <div className="synonym-card__synonyms-input">
					<ClickOutsideAwareComponent 
						onOutsideClick={() => setIsFocused(false)}
						className="synonym-card__synonyms-input-field"
					>
						<InputField
							value={newSynonym}
							onChange={handleInputChange}
							placeholder="Type a synonym..."
							autoFocus
							onFocus={() => setIsFocused(true)}
						/>
						{newSynonym.length > 0 && searchResults.length > 0 && isFocused && (
							<div className="synonym-card__synonyms-suggestions">
								{searchResults.map((result) => (
									<div
										key={result.slug}
										className="synonym-card__synonyms-suggestion"
										onClick={() => handleInputChange(result.word, true)}
									>
										{result.word}
									</div>
								))}
							</div>
						)}
					</ClickOutsideAwareComponent>
					<div className="synonym-card__synonyms-actions">
						<Button onClick={handleSave} className="button-primary">
							Save
						</Button>
						<Button onClick={handleCancel} className="button-secondary">
							Cancel
						</Button>
					</div>
				</div>
    )
}