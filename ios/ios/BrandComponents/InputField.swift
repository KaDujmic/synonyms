//
//  InputField.swift
//  ios
//
//  Created by Karlo Dujmic on 24.07.2025..
//

import SwiftUI

struct InputField: View {
    let placeholder: String
    @Binding var text: String
    let onChange: ((String) -> Void)?
    @FocusState private var isFocused: Bool
    
    init(
        placeholder: String,
        text: Binding<String>,
        onChange: ((String) -> Void)? = nil
    ) {
        self.placeholder = placeholder
        self._text = text
        self.onChange = onChange
    }
    
    var body: some View {
        TextField(placeholder, text: $text)
            .focused($isFocused)
            .padding(.vertical, 10)
            .padding(.horizontal, 10)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(isFocused ? Color.blue : Color.gray, lineWidth: 1.5)
            )
            .onChange(of: text) { oldValue, newValue in
                onChange?(newValue)
            }
    }
}

#Preview {
    VStack(spacing: 20) {
        InputField(
            placeholder: "Enter text here",
            text: .constant(""),
            onChange: { newValue in
                print("Text changed to: \(newValue)")
            }
        )
        
        InputField(
            placeholder: "Another field",
            text: .constant("Some text")
        )
        
        InputField(
            placeholder: "Disabled field",
            text: .constant("")
        )
        .disabled(true)
    }
    .padding()
}

