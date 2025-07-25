import SwiftUI

@MainActor
class CreateWordViewModel: ObservableObject {
    @Published var word: String = ""
    @Published var synonyms: [String] = []
    @Published var currentSynonym: String = ""
    @Published var isFocused: Bool = false
    @Published var searchResults: [String] = []
    @Published var isCreating: Bool = false
    
    // MARK: - Word Actions
    
    func handleWordChange(_ newValue: String) {
        word = newValue
        // You can add word validation or search logic here
    }
    
    // MARK: - Synonym Actions
    
    func handleSynonymChange(_ newValue: String) {
        currentSynonym = newValue
        searchSynonyms(for: newValue)
    }
    
    func addSynonym() {
        guard !currentSynonym.isEmpty else { return }
        
        let trimmedSynonym = currentSynonym.trimmingCharacters(in: .whitespacesAndNewlines)
        if !trimmedSynonym.isEmpty && !synonyms.contains(trimmedSynonym) {
            synonyms.append(trimmedSynonym)
            currentSynonym = ""
            searchResults = []
            isFocused = false
        }
    }
    
    func removeSynonym(_ synonym: String) {
        synonyms.removeAll { $0 == synonym }
    }
    
    func setIsFocused(_ focused: Bool) {
        isFocused = focused
        if !focused {
            searchResults = []
        }
    }
    
    // MARK: - Search Actions
    
    private func searchSynonyms(for query: String) {
        guard !query.isEmpty else {
            searchResults = []
            return
        }
        
        // Simulate API search - replace with actual API call
        let mockResults = [
            "adventure", "journey", "expedition", "quest", "travel",
            "trip", "voyage", "mission", "search", "exploration"
        ].filter { $0.lowercased().contains(query.lowercased()) }
        
        searchResults = Array(mockResults.prefix(5))
    }
    
    // MARK: - Save Actions
    
    func handleSave() {
        guard !word.isEmpty && !synonyms.isEmpty else { return }
        
        isCreating = true
        
        // Simulate API call - replace with actual API call
        Task {
            do {
                try await saveSynonym()
                await MainActor.run {
                    isCreating = false
                    resetForm()
                }
            } catch {
                await MainActor.run {
                    isCreating = false
                    // Handle error - show alert or error message
                }
            }
        }
    }
    
    private func saveSynonym() async throws {
        // Simulate network delay
        try await Task.sleep(nanoseconds: 2_000_000_000) // 2 seconds
        
        // Simulate API call
        let payload: [String: Any] = [
            "word": word,
            "synonyms": synonyms
        ]
        
        // Here you would make the actual API call
        // let response = try await apiService.createSynonym(payload)
        
        // For now, just simulate success
        print("Saving synonym: \(payload)")
    }
    
    private func resetForm() {
        word = ""
        synonyms = []
        currentSynonym = ""
        searchResults = []
        isFocused = false
    }
} 