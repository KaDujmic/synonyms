import SwiftUI

struct CreateWordInput: View {
    @Binding var word: String
    let handleWordChange: (String) -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Word").font(.headline)
            
            InputField(
                placeholder: "Enter a word",
                text: $word,
                onChange: handleWordChange
            )
        }
        .padding(.horizontal)
    }
}

#Preview {
    CreateWordInput(
        word: .constant(""),
        handleWordChange: { _ in }
    )
} 
