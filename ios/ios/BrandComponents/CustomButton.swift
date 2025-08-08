import SwiftUI

struct CustomButton: View {
    let title: String
    let action: () -> Void
    let isDisabled: Bool
    let isLoading: Bool
    let style: ButtonStyle
    
    enum ButtonStyle {
        case primary
        case secondary
        case danger
    }
    
    init(
        title: String,
        action: @escaping () -> Void,
        isDisabled: Bool = false,
        isLoading: Bool = false,
        style: ButtonStyle = .primary
    ) {
        self.title = title
        self.action = action
        self.isDisabled = isDisabled
        self.isLoading = isLoading
        self.style = style
    }
    
    var body: some View {
        SwiftUI.Button(action: action) {
            HStack {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: foregroundColor))
                } else {
                    Text(title)
                        .fontWeight(.medium)
                        .foregroundColor(foregroundColor)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 11)
            .padding(.horizontal, 10)
            .background(backgroundColor)
        }
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .stroke(borderColor, lineWidth: 3)
        )
        .disabled(isDisabled || isLoading)
        .cornerRadius(10)
    }
    
    private var backgroundColor: Color {
        if isDisabled {
            return Color.gray.opacity(0.3)
        }
        
        switch style {
        case .primary:
            return Color.blue
        case .secondary:
            return Color.clear
        case .danger:
            return Color.red
        }
    }
    
    private var foregroundColor: Color {
        if isDisabled {
            return Color.gray
        }
        
        switch style {
        case .primary:
            return Color.white
        case .secondary:
            return Color.blue
        case .danger:
            return Color.white
        }
    }
    
    private var borderColor: Color {
        switch style {
        case .primary:
            return Color.clear
        case .secondary:
            return Color.blue
        case .danger:
            return Color.clear
        }
    }
}

#Preview {
    VStack(spacing: 20) {
        CustomButton(
            title: "Primary Button",
            action: { print("Primary tapped") }
        )
        
        CustomButton(
            title: "Loading Button",
            action: { print("Loading tapped") },
            isLoading: true
        )
        
        CustomButton(
            title: "Secondary Button",
            action: { print("Secondary tapped") },
            style: .secondary
        )
        
        CustomButton(
            title: "Danger Button",
            action: { print("Danger tapped") },
            style: .danger
        )
        
        CustomButton(
            title: "Disabled Button",
            action: { print("Disabled tapped") },
            isDisabled: true
        )
        
        // Show with InputField for height comparison
        HStack {
            InputField(
                placeholder: "Input field",
                text: .constant("")
            )
            
            CustomButton(
                title: "Add",
                action: { print("Add tapped") }
            )
        }
    }
    .padding()
} 
