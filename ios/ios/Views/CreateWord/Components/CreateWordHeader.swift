import SwiftUI

struct CreateWordHeader: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Create Synonym")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Add a new word and its synonyms")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.horizontal)
    }
}

#Preview {
    CreateWordHeader()
} 