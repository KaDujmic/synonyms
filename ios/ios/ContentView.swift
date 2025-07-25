//
//  ContentView.swift
//  ios
//
//  Created by Karlo Dujmic on 24.07.2025..
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
            Button("Get") {
                print("Button tapped!")
            }
                .buttonStyle(.borderedProminent)
                .buttonBorderShape(.capsule)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
