import SwiftUI

struct CreateSynonymsInput: View {
    @Binding var currentSynonym: String
    @Binding var synonyms: [String]
    @Binding var isFocused: Bool
    let searchResults: [String]
    let addSynonym: () -> Void
    let removeSynonym: (String) -> Void
    let handleSynonymChange: (String) -> Void
    let setIsFocused: (Bool) -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Synonyms")
                .font(.headline)
            
            HStack(spacing: 8) {
                InputField(
                    placeholder: "Add synonym",
                    text: $currentSynonym,
                    onChange: handleSynonymChange
                )
                .onTapGesture {
                    setIsFocused(true)
                }
                .frame(maxWidth: .infinity)
                
                CustomButton(
                    title: "Add",
                    action: addSynonym,
                    isDisabled: currentSynonym.isEmpty
                )
                .frame(width: 80)
            }
            
            if !searchResults.isEmpty && isFocused {
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 4) {
                        ForEach(searchResults, id: \.self) { result in
                            SwiftUI.Button(result) {
                                currentSynonym = result
                                addSynonym()
                            }
                            .padding(.horizontal, 12)
                            .padding(.vertical, 8)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(Color(.systemGray6))
                            .cornerRadius(8)
                        }
                    }
                }
                .frame(maxHeight: 200)
            }
            
            if !synonyms.isEmpty {
                VStack(alignment: .leading, spacing: 4) {
                    ForEach(synonyms, id: \.self) { synonym in
                        HStack {
                            Text(synonym)
                                .font(.title3)
                                .padding(.vertical, 2)
                                .padding(.horizontal, 2)
                                .overlay(
                                    Rectangle()
                                        .frame(height: 3)
                                        .foregroundColor(.blue)
                                        .padding(.horizontal, -1),
                                    alignment: .bottom
                                )
                            
                            Spacer()
                            
                            SwiftUI.Button("×") {
                                removeSynonym(synonym)
                            }
                            .foregroundColor(.red)
                            .font(.title)
                            .fontWeight(.bold)
                        }
                        .frame(maxWidth: .infinity)
                    }
                }
            }
        }
        .padding(.horizontal)
    }
}

#Preview {
    CreateSynonymsInput(
        currentSynonym: .constant(""),
        synonyms: .constant(["test", "example"]),
        isFocused: .constant(false),
        searchResults: ["test", "example"],
        addSynonym: {},
        removeSynonym: { _ in },
        handleSynonymChange: { _ in },
        setIsFocused: { _ in }
    )
} 
