import SwiftUI

struct CreateWordSubmit: View {
    let handleSave: () -> Void
    let word: String
    let synonyms: [String]
    let isCreating: Bool
    
    var body: some View {
        CustomButton(
            title: "Create Synonym",
            action: handleSave,
            isDisabled: word.isEmpty || synonyms.isEmpty,
            isLoading: isCreating
        )
        .padding(.horizontal)
    }
}

#Preview {
    VStack {
        CreateWordSubmit(
            handleSave: {},
            word: "test",
            synonyms: ["example"],
            isCreating: false
        )
        
        CreateWordSubmit(
            handleSave: {},
            word: "",
            synonyms: [],
            isCreating: false
        )
        
        CreateWordSubmit(
            handleSave: {},
            word: "test",
            synonyms: ["example"],
            isCreating: true
        )
    }
} 
