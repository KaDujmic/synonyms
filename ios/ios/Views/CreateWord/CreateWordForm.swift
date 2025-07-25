import SwiftUI

struct CreateWordForm: View {
    @StateObject private var viewModel = CreateWordViewModel()
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                CreateWordHeader()
                
                CreateWordInput(
                    word: $viewModel.word,
                    handleWordChange: viewModel.handleWordChange
                )
                
                CreateSynonymsInput(
                    currentSynonym: $viewModel.currentSynonym,
                    synonyms: $viewModel.synonyms,
                    isFocused: $viewModel.isFocused,
                    searchResults: viewModel.searchResults,
                    addSynonym: viewModel.addSynonym,
                    removeSynonym: viewModel.removeSynonym,
                    handleSynonymChange: viewModel.handleSynonymChange,
                    setIsFocused: viewModel.setIsFocused
                )
                
                Spacer()
                
                CreateWordSubmit(
                    handleSave: viewModel.handleSave,
                    word: viewModel.word,
                    synonyms: viewModel.synonyms,
                    isCreating: viewModel.isCreating
                )
            }
            .padding(.vertical)
        }
    }
}

#Preview {
    CreateWordForm()
}
